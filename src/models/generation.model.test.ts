import Generation from "./generation.model";

describe("Generation model", () => {
  it("Should construct", () => {
    const data = {
      id: 0,
      position: "1",
      familyId: 1,
      peoples: [
        {
          id: 1,
          firstname: "Dark",
          lastname: "Vador",
          familyId: 1,
          generationId: 1,
        },
      ],
    };
    const t = new Generation(data);
    expect(t.id).toEqual(data.id);
    expect(t.position).toEqual(data.position);
    expect(t.familyId).toEqual(data.familyId);
    expect(JSON.parse(JSON.stringify(t))).toEqual({
      id: data.id,
      position: data.position,
      familyId: data.familyId,
      peoples: data.peoples,
    });
  });
});
