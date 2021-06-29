import { createServer, Model } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let EMPLOYEES = [
    {
      id: "n1",
      name: "Nikola Duval",
      designation: "Developer Advocate",
      team: "IT",
      manager: "n4",
      image: "https://randomuser.me/api/portraits/men/13.jpg",
    },
    {
      id: "n2",
      name: "Jose Gibson",
      designation: "Frontend Developer",
      team: "IT",
      manager: "n4",
      image: "https://randomuser.me/api/portraits/men/68.jpg",
    },
    {
      id: "n3",
      name: "Henry Hagedorn",
      designation: "Backend Developer",
      team: "IT",
      manager: "n4",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
    },
    {
      id: "n4",
      name: "Benjamin Wells",
      designation: "VP of Engineering",
      team: "IT",
      manager: "n7",
      image: "https://randomuser.me/api/portraits/men/27.jpg",
    },
    {
      id: "n5",
      name: "Pitágoras Monteiro",
      designation: "Sales Head",
      team: "SALES",
      manager: "n7",
      image: "https://randomuser.me/api/portraits/men/71.jpg",
    },
    {
      id: "n6",
      name: "Luis Fernandez",
      designation: "Sales Agent",
      team: "SALES",
      manager: "n5",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "n7",
      name: "Jordan Harris",
      designation: "CEO",
      team: "HEAD",
      manager: "n7",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
    },
  ];

  let server = createServer({
    environment,

    models: {
      employee: Model,
    },

    seeds(server) {
      EMPLOYEES.forEach((employee) => {
        server.create("employee", employee);
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/employees", (schema) => {
        return schema.employees.all();
      });

      this.get("/teams", () => ({
        teams: ["HEAD", "IT", "SALES"],
      }));

      this.get("/tree", () => {
        return EMPLOYEES;
      });
    },
  });

  return server;
}
