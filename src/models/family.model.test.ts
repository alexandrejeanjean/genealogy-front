import Family from "./family.model";

describe("Family model", () => {
  it("Should construct", () => {
    const data = {
      id: 0,
      name: "Solo",
      userId: 0,
    };
    const t = new Family(data);
    expect(t.id).toEqual(data.id);
    expect(t.name).toEqual(data.name);
    expect(t.userId).toEqual(data.userId);
    expect(JSON.parse(JSON.stringify(t))).toEqual({
      id: data.id,
      name: data.name,
      userId: data.userId,
    });
  });
});
