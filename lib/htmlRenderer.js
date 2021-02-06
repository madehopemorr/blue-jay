const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];

  html.push(...employees
    .filter(employee => employee.thisRole() === "Manager")
    .map(manager => renderManager(manager))
  );
  html.push(...employees
    .filter(employee => employee.thisRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  html.push(...employees
    .filter(employee => employee.thisRole() === "Intern")
    .map(intern => renderIntern(intern))
  );

  return renderMain(html.join(""));

};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.thisName());
  template = replacePlaceholders(template, "role", manager.thisRole());
  template = replacePlaceholders(template, "email", manager.thisEmail());
  template = replacePlaceholders(template, "id", manager.thisId());
  template = replacePlaceholders(template, "officeNumber", manager.thisOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.thisName());
  template = replacePlaceholders(template, "role", engineer.thisRole());
  template = replacePlaceholders(template, "email", engineer.thisEmail());
  template = replacePlaceholders(template, "id", engineer.thisId());
  template = replacePlaceholders(template, "github", engineer.thisGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.thisName());
  template = replacePlaceholders(template, "role", intern.thisRole());
  template = replacePlaceholders(template, "email", intern.thisEmail());
  template = replacePlaceholders(template, "id", intern.thisId());
  template = replacePlaceholders(template, "school", intern.thisSchool());
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
