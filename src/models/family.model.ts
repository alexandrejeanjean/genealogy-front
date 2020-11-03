type TFamily = {
  id: number;
  name: string;
  userId: number;
};

export default class Family {
  private _rawData: { id: number; name: string; userId: number };

  constructor({ id, name, userId }: TFamily) {
    this._rawData = {
      id,
      name,
      userId,
    };
  }

  get id() {
    return this._rawData.id;
  }

  get name() {
    return this._rawData.name;
  }

  get userId() {
    return this._rawData.userId;
  }

  toJSON() {
    const { id, name, userId } = this;
    return {
      id,
      name,
      userId,
    };
  }
}
