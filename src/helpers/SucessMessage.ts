export function handleMessage(type: 'create' | 'update' | 'read' | 'delete') {
  switch (type) {
    case 'create':
      return `Sucesso ao criar item`;
    case 'update':
      return 'Sucesso ao atualizar item';
    case 'read':
      return 'Sucesso ao buscar item';
    case 'delete':
      return 'Sucesso ao excluir item';
  }
}
