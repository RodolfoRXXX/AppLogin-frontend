 export interface em_cards{
    tipo: string,
    icono: string,
    titulo: string,
    contenido: any[]
 }

 export const emergencias_data:em_cards[] = [
    {
        tipo: 'personas',
        icono: '../../../../../../assets/img/emergency/er-phone.png',
        titulo: 'Teléfonos útiles',
        contenido: [
            {title: '911', subtitle: 'Central de Emergencias Nacional', body: 'El 911 es un servicio gratuito provincial que permite la recepción de llamadas desde teléfonos fijos y móviles. Centraliza todas las emergencias relacionadas a Bomberos, Comando Radioeléctrico, Defensa Civil, entre otros.'},
            {title: '107', subtitle: 'Emergencias médicas', body: 'Línea gratuita del servicio público de emergencias médicas. Además, averiguá cuál es el número de emergencias médicas de tu localidad y tenelo siempre a mano.'},
            {title: '100', subtitle: 'Bomberos', body: 'Los bomberos de Argentina están capacitados para apagar incendios en casas, complejos habitacionales, residenciales, locales comerciales y plantas industriales.'}
        ]
    },
    {
        tipo: 'personas',
        icono: '../../../../../../assets/img/emergency/pedestrian-accident.png',
        titulo: '¿Qué hacer en caso de un accidente de auto?',
        contenido: [
            {title: 'title1', body: 'Este es el cuerpo del title 1 - auto'},
            {title: 'title2', body: 'Este es el cuerpo del title 2'},
            {title: 'title3', body: 'Este es el cuerpo del title 3'}
        ]
    },
    {
        tipo: 'personas',
        icono: '../../../../../../assets/img/emergency/fade-out.png',
        titulo: '¿Qué hacer en caso de un desmayo?',
        contenido: [
            {title: 'title1', body: 'Este es el cuerpo del title 1 - desmayo'},
            {title: 'title2', body: 'Este es el cuerpo del title 2'},
            {title: 'title3', body: 'Este es el cuerpo del title 3'}
        ]
    },
    {
        tipo: 'personas',
        icono: '../../../../../../assets/img/emergency/acv.png',
        titulo: '¿Qué hacer en caso de sufrir un ACV (Accidente cerebro vascular?',
        contenido: [
            {title: 'title1', body: 'Este es el cuerpo del title 1 - acv'},
            {title: 'title2', body: 'Este es el cuerpo del title 2'},
            {title: 'title3', body: 'Este es el cuerpo del title 3'}
        ]
    },

 ]