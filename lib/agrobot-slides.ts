export interface AgroBotSlide {
  src: string
  title: string
}

export const AGROBOT_PDF_URL = '/agrobot-vision.pdf'

export const agrobotSlides: readonly AgroBotSlide[] = [
  {
    src: '/slides/agrobot/slide-1.jpg',
    title: 'AgroBot Vision — robô agrícola de monitoramento sustentável',
  },
  {
    src: '/slides/agrobot/slide-2.jpg',
    title: 'O problema que queremos resolver',
  },
  {
    src: '/slides/agrobot/slide-3.jpg',
    title: 'O que é o AgroBot Vision',
  },
  {
    src: '/slides/agrobot/slide-4.jpg',
    title: 'Objetivos do projeto',
  },
  {
    src: '/slides/agrobot/slide-5.jpg',
    title: 'Componentes e materiais',
  },
  {
    src: '/slides/agrobot/slide-6.jpg',
    title: 'Como o AgroBot funciona',
  },
  {
    src: '/slides/agrobot/slide-7.jpg',
    title: 'AgroBot em ação',
  },
]
