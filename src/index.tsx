import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";
import { App } from "./App";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelancer de website",
          type: "deposit",
          category: "Desenvolvimento",
          amount: 6000,
          createdAt: new Date("2021-03-03 14:16:50"),
        },
        {
          id: 2,
          title: "Livros",
          type: "withdraw",
          category: "Desenvolvimento pessoal",
          amount: 1000,
          createdAt: new Date("2021-01-03 11:10:50"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
