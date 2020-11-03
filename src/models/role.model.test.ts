import Role from "./role.model";

describe("Role model", () => {
  it("Should construct", () => {
    const data = {
      id: 0,
      role: "father",
    };
    const t = new Role(data);
    expect(t.id).toEqual(data.id);
    expect(t.role).toEqual(data.role);
    expect(JSON.parse(JSON.stringify(t))).toEqual({
      id: data.id,
      role: data.role,
    });
  });
});
