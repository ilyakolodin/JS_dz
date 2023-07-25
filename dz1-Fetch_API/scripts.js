function createNode(element){
	return document.createElement(element)
}

function append(parent, el){
	return parent.appendChild(el)
}

const ul = document.getElementById('time')

const place_name = 'Moscow'

const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de'
const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${place_name}&format=json`

fetch(API_URL_GEO_DATA)
	.then(response => response.json())
	.then(data => get_list_from_pos_str(data))
	.then(coordinates =>
		{
			const API_OPEN_METEO = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${coordinates[0]}&longitude=${coordinates[1]}&hourly=pm10,pm2_5`
			fetch(API_OPEN_METEO)
			.then(response => response.json())
			.then(data => render_polution_table(data))
			.catch(err => console.log(err))
		}
	)
	.catch(err => console.log(err))
	
function get_list_from_pos_str(data) {
  const pos_str = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
  return pos_str.split(' ', 2)
}

function render_polution_table(data){	
	let i = 0
	while(i < data.hourly.time.length){
		let li = createNode('li')
		li.innerHTML = `${data.hourly.time[i]} : ${null_to_emp_str(data.hourly.pm10[i])} : ${null_to_emp_str(data.hourly.pm2_5[i])}`
		append(ul, li)	
		i++ 
		}
}

function null_to_emp_str(x){
	if (x===null){
		x = '-'
	}
	return x
}







