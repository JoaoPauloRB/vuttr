const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

module.exports = (app) => {
    const swaggerOptions = {
        swaggerDefinition: {
          info: {
            version: "1.0.0",
            title: "VUTTR",
            description: "Api para cadastro de ferramentas",
            servers: [`http://localhost:${process.env.PORT}`]
          }
        },
        apis: ["./routes/*.js"]
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}