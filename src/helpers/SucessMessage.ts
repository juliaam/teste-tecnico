export enum TypeResponse {
  CREATE = 'create',
  UPDATE = 'update',
  READ = 'read',
  DELETE = 'delete',
}

export function handleMessage(type: TypeResponse) {
  const mapper = {
    CREATE: 'Sucesso ao criar item',
    UPDATE: 'Sucesso ao atualizar item',
    READ: 'Sucesso ao buscar item',
    DELETE: 'Sucesso ao excluir item',
  };

  return mapper[type];
}
