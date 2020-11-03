type TPerson = {
  id: number;
  firstname: string;
  lastname: string;
  familyId: number;
  generationId: number;
};

export default class Person {
  private _rawData: {
    id: number;
    firstname: string;
    lastname: string;
    familyId: number;
    generationId: number;
  };

  constructor({ id, firstname, lastname, familyId, generationId }: TPerson) {
    this._rawData = {
      id,
      firstname,
      lastname,
      familyId,
      generationId,
    };
  }

  get id() {
    return this._rawData.id;
  }

  get firstname() {
    return this._rawData.firstname;
  }

  get lastname() {
    return this._rawData.lastname;
  }

  get familyId() {
    return this._rawData.familyId;
  }

  get generationId() {
    return this._rawData.generationId;
  }

  toJSON() {
    const { id, firstname, lastname, familyId, generationId } = this;
    return {
      id,
      firstname,
      lastname,
      familyId,
      generationId,
    };
  }
}
