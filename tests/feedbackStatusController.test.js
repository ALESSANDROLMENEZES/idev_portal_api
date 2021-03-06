const feedbackStatusController = require('../controllers/feedbackStatusController');
let status = { description: 'em ANÁLISE' };

test('Deve solicitar uma descrição ', async () => {
    let result = await feedbackStatusController.store();
    expect(result).toBe('Informe uma descrição');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve salvar um novo status ', async () => {
    let result = await feedbackStatusController.store(status);
    status.id = result.id;
    expect(result.description).toBe('Em análise');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve exibir o status salvo ', async () => {
    let result = await feedbackStatusController.show(status.id);
    expect(result.description).toBe('Em análise');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve solicitar o id do status que o usuário deseja ver ', async () => {
    let result = await feedbackStatusController.show();
    expect(result).toBe('Informe um id');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar uma mensagem que já existe um status com a mesma descrição ', async () => {
    let result = await feedbackStatusController.store(status);
    expect(result).toBe('Já existe um status com essa descrição');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});


test('Deve retornar uma mensagem solicitando um status ', async () => {
    let result = await feedbackStatusController.destroy();
    expect(result).toBe('Informe um id válido');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar uma mensagem solicitando o id do status ', async () => {
    let result = await feedbackStatusController.destroy({description:'Em análise'});
    expect(result).toBe('Informe um id válido');
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});


test('Deve excluir apenas o status informado ', async () => {
    let result = await feedbackStatusController.destroy(status.id);
    expect(result).toBe(1);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar os demais status que são padrão ', async () => {
    let result = await feedbackStatusController.index();
    expect(result.length).toBeGreaterThan(1);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve retornar apenas um status ', async () => {
    let result = await feedbackStatusController.index(1);
    expect(result.length).toBe(1);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve atualizar a descrição de um status e normalizar a descrição ', async () => {
    let result = await feedbackStatusController.update({id:1, description:'liBERADO'});
    expect(result).toEqual([1]);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

test('Deve atualizar a descrição de um status ', async () => {
    let result = await feedbackStatusController.update({id:1, description:'Em desenvolvimento'});
    expect(result).toEqual([1]);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
});

