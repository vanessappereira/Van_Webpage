import ejs from 'ejs';
import fs from 'fs';
import path from 'path';

// Diretórios de templates e saída
const templatesDir = path.join(process.cwd(), 'views');
const outputDir = path.join(process.cwd(), 'public');

// Garante que o diretório de saída exista
const ensureOutputDirExists = () => {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
};

// Função para renderizar um template EJS
const renderEJS = async (templateName, data = {}) => {
    const templatePath = path.join(templatesDir, `${templateName}.ejs`);
    const outputPath = path.join(outputDir, `${templateName}.html`);

    try {
        const str = await ejs.renderFile(templatePath, data);
        fs.writeFileSync(outputPath, str);
        console.log(`Rendered ${templateName} to HTML`);
    } catch (err) {
        console.error(`Error rendering ${templateName}:`, err);
    }
};

// Mapeamento de títulos para cada template
const templateTitles = {
    index: 'Homepage',
    about: 'About Me',
    drumHomepage: 'Drum Kit Simulator',
    tacoRecipesHomepage: 'Taco Recipes',
    diceHomepage: 'Dice Roller Simulator',
    bandNameHomepage: 'Band Name Generator',
    simonSaysHomepage: 'Simon Says Game',
};

// Função para renderizar todos os templates
const renderAllTemplates = async () => {
    const templateFiles = fs.readdirSync(templatesDir).filter(file => file.endsWith('.ejs'));

    for (const file of templateFiles) {
        const templateName = path.basename(file, '.ejs');
        const title = templateTitles[templateName] || 'Default Title'; // Usa o título do mapeamento ou um título padrão
        await renderEJS(templateName, { title, pageName: templateName }); // Passa o título correto
    }
};

// Executa a renderização
(async () => {
    ensureOutputDirExists(); // Garante que o diretório de saída exista
    await renderAllTemplates(); // Renderiza todos os templates
})();