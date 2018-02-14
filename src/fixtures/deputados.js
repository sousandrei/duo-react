const cpf = require('cpf')
const faker = require('faker')
const moment = require('moment')
const { writeFileSync } = require('fs')

faker.locale = 'pt_BR'

let deputados = []

for (let i = 1; i < 101; i++) {
	deputados.push({
		id: i,
		foto: faker.image.business(),
		partido: faker.random.boolean() ? 'PT' : 'PMDB',
		uf: faker.address.state(),
		id_camara: faker.random.number(),
		nome_parlamentar: `${faker.name.firstName()} ${faker.name.jobType()}`,
		telefone: faker.phone.phoneNumber(),
		condicao_eleitoral: faker.random.boolean ?
			faker.random.boolean ? 'titular' : 'efetivado' :
			'suplente',
		anexo: faker.address.city(),
		gabinete: `${faker.random.number()} ${faker.random.number()}`,
		fax: faker.phone.phoneNumber(),
		email: faker.internet.email(),
		tendencia: faker.random.boolean ?
			faker.random.boolean ? 'governista' : 'oposicao' :
			'indepentende',
		profissao: faker.name.jobTitle(),
		situacao: faker.random.word(),
		pessoa: {
			id: i,
			nome: faker.name.findName(),
			cpf: cpf.generate(),
			data_nascimento: moment().format('DD/MM/YYYY'),
			sexo: faker.random.boolean() ? 'M' : 'F',
			foto: faker.image.business()
		}
	})
}

writeFileSync(__dirname + '/deputado.mock.js',
	JSON.stringify(deputados, null, 4))
