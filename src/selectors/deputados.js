import { find } from 'lodash'

export const selectDeputado = (
	deputados,
	{ id } = {}
) => {
	if (id == -1)
		return { pessoa: {} }

	const deputado = find(deputados, { id })

	if (deputado)
		return deputado

	return deputados
}
