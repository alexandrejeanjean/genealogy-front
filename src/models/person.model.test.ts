import Person from "./person.model";

describe("Person model", () => {
  it("Should construct", () => {
    const data = {
      id: 0,
      firstname: "Han",
      lastname: "Solo",
      familyId: 0,
      generationId: 1,
    };
    const t = new Person(data);
    expect(t.id).toEqual(data.id);
    expect(t.firstname).toEqual(data.firstname);
    expect(t.lastname).toEqual(data.lastname);
    expect(t.familyId).toEqual(data.familyId);
    expect(t.generationId).toEqual(data.generationId);
    expect(JSON.parse(JSON.stringify(t))).toEqual({
      id: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      familyId: data.familyId,
      generationId: data.generationId,
    });
  });
});
