const fs = require("fs");
const { parse } = require("node-html-parser");
const {
  getFileImportsElements,
  getFileComponents,
  getComponentName,
  removeLineFromText,
  removeLastLineFromText,
  getImportedElementFileSource,
  getFilePathBasedOnParentAndChildFilePath,
  convertObjectToArray,
  getFilePathWithType,
} = require("../helpers");
const {
  process_file_content,
  removeImports,
  removeComments,
} = require("../parse");
const {
  ALL_BLANK_LINES,
  MORE_THAN_ONE_SPACE,
  LINE_BREAKS,
} = require("../regexp");
const { log } = require("../utils");
const PROHIBITED_METHODS = require("../config/prohibitedMethods");
const hasWidgetPropsCheck = require("./hasWidgetPropsCheck");
const importableFiles = require("../config/importableFiles");
const extractPropsFromJSX = require("../parsers/extractPropsFromJSX");
const extractJSXElements = require("../parsers/extractJSXElements");
const extractJSX = require("../parsers/extractJSX");
const replaceJSXElement = require("../parsers/replaceJSXElement");
const extractJSXChildren = require("../parsers/extractJSXChildren");
const processChildrenWidget = require("./processChildrenWidget");
const transformImports = require("../parsers/transformImports");
const analyzeFunctionSignature = require("../parsers/analyzeFunctionSignature");
const removeFunctionParams = require("../parsers/removeFunctionParams");
const transformAsyncAwait = require("../parsers/transformAsyncAwait");
const compilerOptions = require("./compilerOptions");
const prepareToInsertCssContent = require("../parsers/prepareToInsertCssContent");

let processError = null;

/**
 * @param {string} content
 */
const getFirstLineContent = (content) => {
  const firstLineRegex = /^(.*)$/m;
  const firstLineFound = content.match(firstLineRegex);
  return firstLineFound[1] || null;
};

/**
 * Remove prohibited methods
 *
 * Métodos/propriedades que já existem em cada contexto de um Widget não deve ser passado de um Widget para outro.
 * @param {string[]} importItems
 * @returns
 */
const removeProhibitedMethods = (importItems) =>
  importItems.filter((item) => {
    return !PROHIBITED_METHODS.includes(item);
  });

/**
 * Processa o bundle final deste arquivo somente.
 *
 * - Aqui ainda não é injetado as dependencias de Widget, onde NomeComponente vira <Widget code={...NomeComponente} props={...} />
 * - Aqui ainda não é injetado as dependencias não widgets de arquivos .ts or .js
 * - Aqui são setados os: componentParamsItems, componentImportItems, finalFileBundle (atualizado), widgetName (se for um arquivo .tsx ou .jsx)
 * componentComponentItems (se for um arquivo .tsx ou .jsx)
 * - Tudo que isso faz é entregar um bundle final onde tem algo parecido com isso:
 *
 * Recebe isso:
 *
 * import Anything from './anywhere'
 * const App ({age, name}) => {
 *  const [foo, setFoo] = useState(2)
 *  return (<>{age, name}</>)
 * }
 *
 * E retorna isso:
 *
 * const { age, name } = props;
 * return (<>{age, name}</>)
 *
 *
 * @param {{filePath: string, toImport: string[], content: string}} fileSchema
 * @returns {{filePath: string, toImport: string[], content: string, finalFileBundle: string}}
 */
const processSchema = (fileSchema) => {
  // Prepara o schema do <Widget /> e dos arquivos não Widget (ts, js)

  // ITEM 0
  const isJsxFile =
    fileSchema.filePath.endsWith(".jsx") ||
    fileSchema.filePath.endsWith(".tsx");

  // Verifica se é o arquivo principal index.tsx | index.jsx
  const isIndex =
    fileSchema.filePath.includes("src/index.tsx") ||
    fileSchema.filePath.includes("src/index.jsx");

  // isModule = Arquivo sem controle de estado
  let isModule = !hasWidgetPropsCheck(fileSchema.content) && !isIndex;

  fileSchema.isModule = isModule;

  // ITEM 2
  const transpileTypescript =
    fileSchema.filePath.endsWith(".ts") || fileSchema.filePath.endsWith(".tsx");

  let jsContent = process_file_content(
    fileSchema.content,
    transpileTypescript,
    false,
  );

  // Conteúdo puro apenas com a remoção de elementos typescript, import e exports
  fileSchema.pureJsContent = process_file_content(
    fileSchema.content,
    transpileTypescript,
  );

  // ITEM 1
  let componentImports = getFileImportsElements(jsContent);
  componentImports = removeProhibitedMethods(componentImports);

  // Remove imports (isso foi inibido no process_file_content no terceiro parametro)
  jsContent = removeImports(jsContent).replaceAll(ALL_BLANK_LINES, ""); // remove linhas em branco;

  // ITEM 3.2

  // remove qualquer propriedade "props", ja que vai ser inclusa automaticamente
  // componentImports = componentImports.filter((item) => item !== "props");
  // Já esta sendo feito pelo "removeProhibitedMethods"

  // Pega e registra o diretório do arquivo de cada dependencia/imported item
  const componentImportItems = {};

  componentImports.forEach((importedItem) => {
    // console.log("Item:", importedItem);
    let importedItemFileSource = getImportedElementFileSource(
      fileSchema.content,
      importedItem,
    );

    // NOTE: Teste => converte todo arquivo alem em caminhos readi

    // Se o caminho for null, quer dizer que é uma biblioteca e o arquivo
    // não está na pasta src
    if (!importedItemFileSource) {
      return;
    }

    // 1o - Verifica se é um Componente do Alem, ser for, obtem o caminho

    // 2o - Se não for componente Alem, segue em frente e busca no esquema de arquivos
    // do projeto

    // 1 - Verifica se é um arquivo que vem da lib Além
    const isAlemFile = importedItemFileSource.includes(
      "lib/alem-vm/importable",
    );

    // 2 - Se não for, continua o processo normalmente, se for, ignora o tratamento abaixo
    if (!isAlemFile) {
      // Check if its has path alias
      if (compilerOptions.hasPathAlias(importedItemFileSource)) {
        importedItemFileSource = compilerOptions.replacePathAlias(
          importedItemFileSource,
        );

        // Set the final type file (.js / .ts / .jsx / .tsx)
        importedItemFileSource = getFilePathWithType(importedItemFileSource);
      } else {
        importedItemFileSource = getFilePathBasedOnParentAndChildFilePath(
          fileSchema.filePath,
          importedItemFileSource,
        );
      }
    }

    componentImportItems[importedItem] = importedItemFileSource;
  });
  // console.log("\n\n");
  fileSchema.componentImportItems = componentImportItems;

  // Se nao for um JSX, processa o arquivo de forma normal
  if (!isJsxFile) {
    // FINAL: para arquivos nao JSX
    fileSchema.finalFileBundle = jsContent;
    fileSchema.jsContent = jsContent;
    return fileSchema;
  }

  // Se for JSX, inicia o processo de transformar num componente que retorna Widget

  // ITEM 3.1
  const componentName = getComponentName(jsContent);
  fileSchema.widgetName = componentName;

  // Se nao tiver função do componente, dispara erro
  if (!componentName) {
    log.error(`Error: ${fileSchema.filePath}: Component function not found!`);
  }

  // SUPPORT FOR IMMEDIATE FUNCTION RETURNING ELEMENT - PART 1
  // Se a primeira linha do arquivo contiver elementos html, entao nao precisa processar
  // já que se trata de um arquivo stateless simples
  // ex: const ShareIcon = () => <span className="material-symbols-outlined">share</span>;
  if (
    (getFirstLineContent(jsContent).includes("<") ||
      getFirstLineContent(jsContent).endsWith("(")) &&
    !isModule
  ) {
    // Aqui eu uso o conteúdo original bruto mesmo. O parser consegue dividir os elementos
    // o elemento [0] vai ser o inicio da funcao
    // o elemento [1] vai ser o corpo inteiro a partir do primeiro nó dos elementos html
    const htmlParsedFile = parse(fileSchema.content);
    jsContent = htmlParsedFile.childNodes[1].toString();
    // TODO: Verificar outra forma de fazer as duas linhas acima e remover o "node-html-parser"

    // Encobre o conteúdo com um return
    jsContent = `
    return (
      ${jsContent}
    )
    `;

    // FINAL: para arquivos JSX stateless simples no formato do ex.
    fileSchema.finalFileBundle = jsContent;
    fileSchema.jsContent = jsContent;
    return fileSchema;
  }

  // Módulos (arquivos stateles) não devem ter seu conteúdo modificado
  if (!isModule) {
    // Remove os parametros da função
    jsContent = removeFunctionParams(jsContent);
  }

  // Módulos devem ter seu jsContent inteiro, sem remover ou alterar sua estrutura.
  // Isso é porque eles são helpers que retornam JSX. Arquivos que não lidam com JSX
  // também podem ser módulos
  if (!isModule) {
    // ITEM 4 (remover primeira linha)
    jsContent = removeLineFromText(jsContent, 1);

    // ITEM 5 (remover ultima linha)
    jsContent = removeLastLineFromText(jsContent);
  }

  // Items do Componente
  if (isJsxFile) {
    fileSchema.componentComponentItems = getFileComponents(fileSchema.content);
  } else {
    fileSchema.componentComponentItems = [];
  }

  // ITEM 6
  // ATENCAO: esta copiando tipos de props tbm do typescript

  if (!isModule) {
    const componentParams = analyzeFunctionSignature(fileSchema.pureJsContent);

    if (componentParams.capturedParams) {
      jsContent = `
    const ${componentParams.capturedParams} = props;
    ${jsContent}
    `;
    }
  }

  // FINAL
  // Injeta o conteúdo final de widget no arquivo
  fileSchema.finalFileBundle = jsContent;
  fileSchema.jsContent = jsContent;

  return fileSchema;
};

/**
 * Faz o procedimento de trocar componentes nome de componentes por <Widget code={...} />
 *
 * Similar ao "swapComponentsForWidgets", mas aqui, somente os arquivos stateless são processados
 *
 * @param {*} fileSchemas
 * @param {*} fileSchema
 * @returns
 */
const swapComponentsForStatelessFiles = (fileSchemas, fileSchema) => {
  // 1 - Widget Only
  // 2 - Copia o conteúdo (code) da dependencia usando o nome do componente
  // e usa esse code dentro do <Widget /> nas posições onde tem quer ser usado esse componente
  // ex:
  /**
   * - arquivo ComponentB -
   * const ComponentA = `code do componente`
   *
   * const SubTitle = `code do componente`
   *
   * return (
   *    <>
   *        <p>Olá Mundo</p>
   *        <Widget code={ComponentA} props={{label: "oi mundo"}}/>
   *        <Widget code={ComponentA} props={{label: "larica sinistra"}}/>
   *        <h1>Projeto</h1>
   *        <Widget code={SubTitle} props={{text: "Projeto Maroto"}}/>
   *    </>
   * )
   */

  const pastedFiles = [];
  // let fileBundle = fileSchema.finalFileBundle;
  let fileBundle = fileSchema.jsContent;

  Object.keys(fileSchema.componentImportItems).forEach((importItem) => {
    // Se for um arquivo disponível, segue (null quer dizer que é um import de alguma lib nao local no src)
    const importItemFilePath = fileSchema.componentImportItems[importItem];
    // Nao deve processar (copiar e colar) o conteúdo do arquivo mais de uma vez
    if (importItemFilePath && !pastedFiles.includes(importItemFilePath)) {
      // Adiciona na lista de items ja processados
      pastedFiles.push(importItemFilePath);

      // Is import item comming from JSX | TSX file?
      const isImportItemCommingFromJsxFile =
        importItemFilePath.endsWith("tsx") ||
        importItemFilePath.endsWith("jsx");

      if (isImportItemCommingFromJsxFile) {
        // https://www.npmjs.com/package/node-html-parser#global-methods
        // const rootHTML = parse(fileBundle, {});

        // Files without source are the ones that not live in the src directory

        // INFO: Verifica se o caminho do arquivo a ser processado não é "null"
        const importItemFileSource =
          fileSchema.componentImportItems[importItem]; // src/path/to/file.tsx | null

        // Se existir o conteúdo localmente... segue...
        if (importItemFileSource) {
          // NOTE: Aqui que a magica acontece!!!!

          // Le o nome do Widget dependente (usando o fileSchema dele)
          let importItemWidget = fileSchemas.find(
            (importFileSchema) =>
              importFileSchema.filePath === importItemFileSource,
          );

          const importItemWidgetComponentName =
            importItemWidget.widgetName ||
            getComponentName(importItemWidget.finalFileBundle);

          if (importItemWidgetComponentName && !importItemWidget.isModule) {
            // Processa todos os componentes filhos
            // Cada elemento do mesmo tipo é um filho diferente que foi adicionado ao elemento pai
            // const importItemElements =
            //   fileSchema.htmlElementsProps[importItemWidgetComponentName] || [];

            // Usa o rootHTML (conteúdo html do componente) para pegar a lista de Componentes do tipo desejado. ex: Title
            // const componentElements = rootHTML.getElementsByTagName(
            //   importItemWidgetComponentName,
            // );
            // INFO: Esses comentarios acima creio que podem ser apagados, verificar
            // se ainda estou usando o modulo html parse

            const jsxOnly = extractJSX(fileSchema.content);

            const fixedJsxOnly =
              jsxOnly.length > 1
                ? `<>${jsxOnly.join("\n")}</>`
                : jsxOnly.join("\n");

            const componentElements = extractJSXElements(
              fixedJsxOnly,
              importItemWidgetComponentName,
            );

            // Seta qualquer erro se tiver
            if (!processError && componentElements.error) {
              processError = `${fileSchema.filePath}: ${componentElements.error}`;
            }
            if (processError) return;

            // Transfor cada componente em Widget com suas propriedades
            componentElements.elements.forEach((div, divIndex) => {
              const htmlElementString = componentElements.elements[divIndex]
                .toString()
                .replaceAll(LINE_BREAKS, "")
                .replaceAll(MORE_THAN_ONE_SPACE, " ");

              let childProps = extractPropsFromJSX(htmlElementString);

              // console.log("======= TESTE DO MALACDO PROPS =======");
              // console.log(importItemFilePath);
              // console.log(childProps);
              // console.log("\n\n");

              // get the children
              let childChildren = extractJSXChildren(htmlElementString);
              if (childChildren) {
                childChildren = processChildrenWidget(
                  childChildren,
                  fileSchemas,
                );
                childProps = { ...childProps, children: childChildren };
              }

              const importItemPropsStringSequence =
                convertObjectToArray(childProps).join(",");

              // Babel segue os padroes JS, por isso:
              // 1 - Adiciona uma uma função no topo
              // 2 - Fecha a função no final
              fileBundle = `const TempMethod = () => {\n${fileBundle}\n}`;
              // NOTE: nao adicionando a ultima linha, mas estou removendo a ultima linha
              // Caso quebre, ver isso. [Provavelmente o escape acima esta adicionando o } no final]

              // Transform components generated by .jsx / .tsx into <Widget code={code} .../>
              fileBundle = replaceJSXElement(
                fileBundle,
                importItemWidgetComponentName,
                0,
                `<Widget loading=" " code={props.alem.componentsCode.${importItemWidgetComponentName}} props={{ ...({${importItemPropsStringSequence ? `${importItemPropsStringSequence},` : ""} ...props}) }} />`,
              );

              // Remove funcao no topo e ultima linha fechando a funcao
              fileBundle = fileBundle.replace("const TempMethod = () => {", "");
              fileBundle = removeLastLineFromText(fileBundle);
            });
          }

          // Altera o jsContent com os Widgets
          fileSchema.jsContent = fileBundle;
          // Altera o finalBundle que é usado posteriormente
          fileSchema.finalFileBundle = fileBundle;
        }
      }
    }
  });

  return fileSchema;
};

// Arquivos sinalizados que devem ser processados pelo "injectFilesDependencies" posteriormente devido
// a falta de outro arquivo que ainda não tenha sido processado
// const pending_injectFilesDependencies = [];
// const postponedInjections = [];
// const postponedInjectionsFilePath = [];

/**
 * Coloca o conteúdo dos arquivos nao .ts e .jsx de dependencia dentro do bundle de cada arquivo do schema global
 * Esse é um processo que ocorre para todos os arquivos, mas somente copia e cola o conteudo para arquivos nao JSX.
 *
 * Arquivos reconhecidos como JSX (Widgets) serão tratados de outra forma. Ver "swapComponentsForWidgets"
 * @param {{filePath: string, toImport: string[], content: string, finalFileBundle: string, componentImportItems:[], componentParamsItems:[], componentComponentItems: [], widgetName?: string, htmlElementsProps: {}}[]} fileSchemas
 * @param {{filePath: string, toImport: string[], content: string, finalFileBundle: string, componentImportItems:[], componentParamsItems:[], componentComponentItems: [], widgetName?: string, htmlElementsProps: {}}} fileSchema
 */
const prepareListOfInjections = (fileSchemas, fileSchema) => {
  const pastedFiles = [];

  // console.log("====== CHECAGEM DE INJECAO ======  ");
  // console.log("Arquivo sendo processado:", fileSchema.filePath);
  // console.log("Imports do arquivo:", fileSchema.componentImportItems);

  // Checa se o item faz parte de componentes
  Object.keys(fileSchema.componentImportItems).forEach((importItem) => {
    // Se for item não widget, inclui no topo do bundle do arquivo

    // Se for um arquivo disponível, segue (null quer dizer que é um import de alguma lib nao local no src)
    const importItemFileSource = fileSchema.componentImportItems[importItem]; // src/path/to/file.tsx | null
    // Nao deve processar (copiar e colar) o conteúdo do arquivo mais de uma vez
    if (importItemFileSource && !pastedFiles.includes(importItemFileSource)) {
      // Adiciona na lista de items ja processados
      pastedFiles.push(importItemFileSource);

      // Load file content (copy and paste file content where this import item is comming from)
      // Files without source are the ones that not live in the src directory
      // const importItemFileSource = fileSchema.componentImportItems[importItem]; // src/path/to/file.tsx | null

      let importItemFileContent = fileSchemas.find(
        (importFileSchema) =>
          importFileSchema.filePath === importItemFileSource,
      );

      // NAO WIDGETS | MODULOS (arquivos que contenham "module" no nome): tem o conteúdo de seu arquivo copiado e colado no corpo do arquivo sendo processado atual
      if (importItemFileContent.isModule) {
        // Funcao recursiva aqui para fazer com que arquivos ainda não processados pelo injection, sejam primeiro
        if (!importItemFileContent.injectFilesDependencies_Done) {
          // Faz o processo primeiro no arquivo dependente

          // updated "importItemFileContent"
          importItemFileContent = prepareListOfInjections(
            fileSchemas,
            importItemFileContent,
          );
        }

        // Insere os arquivos dependentes que já foram inseridos no bundle. Isso evita duplicatas de conteúdo
        if (!fileSchema.toBeInjectedFiles) {
          fileSchema.toBeInjectedFiles = [];
        }
        // Deve guardar as informações da injeção da dependencial atual e as dependencias da dependencia atual

        // Adiciona somente se ainda nao tiver o item na lista
        if (
          !fileSchema.toBeInjectedFiles.includes(importItemFileContent.filePath)
        ) {
          fileSchema.toBeInjectedFiles.push(
            importItemFileContent.filePath,
            ...(importItemFileContent.toBeInjectedFiles
              ? importItemFileContent.toBeInjectedFiles
              : []),
          );
        }
      }
    }
  });

  // Sinaliza que o procsso de injecao foi finalizado neste arquivo
  fileSchema.injectFilesDependencies_Done = true;

  return fileSchema;
};

/**
 * Coloca o conteúdo dos arquivos nao .ts e .jsx de dependencia dentro do bundle de cada arquivo do schema global
 * Esse é um processo que ocorre para todos os arquivos, mas somente copia e cola o conteudo para arquivos nao JSX.
 *
 * Arquivos reconhecidos como JSX (Widgets) serão tratados de outra forma. Ver "swapComponentsForWidgets"
 * @param {{filePath: string, toImport: string[], content: string, finalFileBundle: string, componentImportItems:[], toBeInjectedFiles:[], componentParamsItems:[], componentComponentItems: [], widgetName?: string, htmlElementsProps: {}}[]} fileSchemas
 * @param {{filePath: string, toImport: string[], content: string, finalFileBundle: string, componentImportItems:[], toBeInjectedFiles:[], componentParamsItems:[], componentComponentItems: [], widgetName?: string, htmlElementsProps: {}}} fileSchema
 */
const injectFilesDependencies = (fileSchemas, fileSchema) => {
  let fileBundle = fileSchema.finalFileBundle;

  // Se nao tiver nada a ser injetado, somente retorna o file Schema sem alterações
  if (!fileSchema.toBeInjectedFiles) {
    return fileSchema;
  }

  const injectedFiles = fileSchema.injectedFiles || [];

  // Checa se o item faz parte de componentes
  fileSchema.toBeInjectedFiles.forEach((fileItemPath) => {
    // Se ja o arquivo ja tiver sido injetado, ignora
    if (injectedFiles.includes(fileItemPath)) {
      return;
    }

    // Pega o esquema do arquivo
    let fileItemSchema = fileSchemas.find(
      (importFileSchema) => importFileSchema.filePath === fileItemPath,
    );

    fileBundle = `
          ${fileItemSchema.jsContent}
          ${fileBundle}
          `;

    injectedFiles.push(fileItemPath);
    fileSchema.finalFileBundle = fileBundle;
    fileSchema.injectedFiles = injectedFiles;
  });

  return fileSchema;
};

/**
 * Caso tenha dependencias do Alem (inportable items), prepara eles para serem injetados.
 *
 * Remove os elementos da chave em que está e coloca em uma nova linha contendo seu caminho
 * até a lib alem-vm/importable/item...
 * @param {{filePath: string, toImport: string[], content: string, finalFileBundle: string, componentImportItems:[], componentParamsItems:[], componentComponentItems: [], widgetName?: string, htmlElementsProps: {}}} fileSchema
 */
const prepareAlemDependencies = (fileSchema) => {
  const importItems = getFileImportsElements(fileSchema.content);

  let fileContent = fileSchema.content;
  let contentChanged = false;

  importItems.forEach((item) => {
    // TODO: [Alem items: Routes, Link, etc] Checar se esta dando conflito com items do projeto

    const importStatementFileSource = getImportedElementFileSource(
      fileContent,
      item,
    );

    // Se o item estiver vindo de um destino que contenha "alem-vm" ou "alem"
    // logo é um item do Além.
    if (
      /\balem-vm\b/.test(importStatementFileSource) ||
      /\balem\b/.test(importStatementFileSource)
    ) {
      const alemImportElement = importableFiles[item];

      // Se for um elemento importavel do Além e estiver presente no importableFiles do Além, então
      // insere a nova linha no arquivo pedindo para importar o elemento.
      if (alemImportElement) {
        contentChanged = true;

        fileContent = transformImports(fileContent, item, alemImportElement);
      }
    }
  });

  if (contentChanged) {
    fileSchema.content = fileContent;
  }

  return fileSchema;
};

// * @returns {{filePath: string, toImport: string[], content: string, finalFileBundle: string, componentImportItems:[], componentParamsItems:[], componentComponentItems: [], widgetName?: string, htmlElementsProps: {}}[]}
// INFO: isso pertencia a estrutura abaixo e foi removido porque esta desatualizado

/**
 * @param {{filePath: string, toImport: string[], content: string}[]} fileSchemas
 * @param {*} additionalFileSchemas FileSchemas to be added to the list of main fileSchemas. It's going to be added first before
 * the process starts. This is util to inject previous schema files like Além importable items.
 */
const transformSchemaToWidget = (fileSchemas, additionalFileSchemas) => {
  // TODO: trocar esse nome, transformSchemaToWidget -> transformSchemaToWidgetSchema
  // Reset error state
  processError = null;

  // Tag alem files (INFO: Isso não está servindo pra nada atualmente)
  // TODO: Checar para ver se remove nas versoes posteriores caso não tenha utilidade isso aqui
  fileSchemas.forEach((fileSchema, fileSchemaIndex) => {
    const isAlemImportableFile = fileSchema.filePath.includes(
      "lib/alem-vm/importable/",
    );

    fileSchema.isAlemFile = isAlemImportableFile;
    fileSchemas[fileSchemaIndex] = fileSchema;
  });

  // Caso tenha dependencias do Alem (inportable items), prepara eles para serem injetados
  // Remove os elementos da chave em que está e coloca em uma nova linha contendo seu caminho
  // até a lib alem-vm/importable/item...
  fileSchemas.forEach((fileSchema, fileSchemaIndex) => {
    fileSchemas[fileSchemaIndex] = prepareAlemDependencies(fileSchema);
  });

  // Adiciona schemas já processados dos items importáveis do Além (hahaha)
  if (additionalFileSchemas) {
    fileSchemas = [...additionalFileSchemas, ...fileSchemas];
  }

  // Gera o primeiro finalFileBundle e widgetName(para Widgets somente), parametros e imports
  fileSchemas.forEach((fileSchema, fileSchemaIndex) => {
    fileSchemas[fileSchemaIndex] = processSchema(fileSchema);
  });

  fileSchemas.forEach((fileSchema, fileSchemaIndex) => {
    // Processa arquivos que contenham elementos html mas são stateless
    // console.log("Current file:", fileSchema.filePath);
    fileSchemas[fileSchemaIndex] = swapComponentsForStatelessFiles(
      fileSchemas,
      fileSchema,
    );
  });

  // Prepara lista de arquivos a serem injetados dentro de cada arquivo
  fileSchemas.forEach((fileSchema, fileSchemaIndex) => {
    fileSchemas[fileSchemaIndex] = prepareListOfInjections(
      fileSchemas,
      fileSchema,
    );
  });

  // Copia e cola o conteúdo de arquivos não .tsx | .jsx para dentro dos arquivos que dependem deles
  fileSchemas.forEach((fileSchema, fileSchemaIndex) => {
    fileSchemas[fileSchemaIndex] = injectFilesDependencies(
      fileSchemas,
      fileSchema,
    );
  });

  // Faz transformação de async/await para o formato promisify
  fileSchemas.forEach((fileSchema, fileSchemaIndex) => {
    fileSchema.finalFileBundle = transformAsyncAwait(
      fileSchema.finalFileBundle,
    );
    fileSchemas[fileSchemaIndex] = fileSchema;
  });

  return { fileSchemas, processError };
};

module.exports = transformSchemaToWidget;
