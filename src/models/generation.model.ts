type TPerson = {
  id: number;
  firstname: string;
  lastname: string;
  familyId: number;
  generationId: number;
};

type TFamily = {
  id: number;
  position: string;
  familyId: number;
  peoples: TPerson[];
};

export default class Family {
  private _rawData: {
    id: number;
    position: string;
    familyId: number;
    peoples: TPerson[];
  };

  constructor({ id, position, familyId, peoples }: TFamily) {
    this._rawData = {
      id,
      position,
      familyId,
      peoples,
    };
  }

  get id() {
    return this._rawData.id;
  }

  get position() {
    return this._rawData.position;
  }

  get familyId() {
    return this._rawData.familyId;
  }

  get peoples() {
    return this._rawData.peoples;
  }

  toJSON() {
    const { id, position, familyId, peoples } = this;
    return {
      id,
      position,
      familyId,
      peoples,
    };
  }
}
