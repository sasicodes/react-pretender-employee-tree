export const formHierarchy = (list) => {
  let root = {};
  let rootIndex;
  list.forEach((employee, i) => {
    if (employee.id === employee.manager) {
      root = { ...employee };
      rootIndex = i;
    }
  });
  list.splice(rootIndex, 1);
  let sortEmployees = function (employees, parentId) {
    let node = [];
    employees
      .filter(function (d) {
        return d.manager === parentId;
      })
      .forEach(function (d) {
        var cd = d;
        cd.children = sortEmployees(employees, d.id);
        return node.push(cd);
      });
    return node;
  };

  let results = sortEmployees(list, root.id);
  return { ...root, children: results };
};
