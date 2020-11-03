type TRole = {
  id: number;
  role: string;
};

export default class Role {
  private _rawData: {
    id: number;
    role: string;
  };

  constructor({ id, role }: TRole) {
    this._rawData = {
      id,
      role,
    };
  }

  get id() {
    return this._rawData.id;
  }

  get role() {
    return this._rawData.role;
  }

  toJSON() {
    const { id, role } = this;
    return {
      id,
      role,
    };
  }
}
