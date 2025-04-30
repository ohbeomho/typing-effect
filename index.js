const text_elements = Array.from(document.querySelectorAll('.text'))

for (let text_element of text_elements) {
	;(async (text_element, text_list) => {
		let text_idx = 0
		const cursor = text_element.querySelector('.cursor')
		const content = text_element.querySelector('.content')

		const next_text = () => {
			text_idx++
			if (text_idx >= text_list.length) text_idx = 0
		}
		const type_text = () => {
			const text = text_list[text_idx]
			cursor.classList.add('typing')
			for (let i = 0; i < text.length; i++)
				setTimeout(() => (content.textContent += text[i]), i * 150)
			setTimeout(
				() => cursor.classList.remove('typing'),
				(text.length - 1) * 100,
			)
			setTimeout(() => remove_text(), text.length * 100 + 3000)
		}
		const remove_text = () => {
			const text = text_list[text_idx]
			cursor.classList.add('typing')
			for (let i = text.length - 1; i >= 0; i--)
				setTimeout(
					() => (content.textContent = ' ' + text.slice(0, i)),
					(text.length - i) * 100,
				)
			setTimeout(
				() => cursor.classList.remove('typing'),
				(text.length - 1) * 100,
			)
			setTimeout(
				() => {
					next_text()
					type_text()
				},
				text.length * 100 + 2000,
			)
		}

		setTimeout(type_text, 1000)
	})(text_element, text_element.dataset.text.split(','))
}
