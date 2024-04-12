// import whitelist from './modules/whitelist/result-whitelist.json'
import path from 'path'

export default defineNuxtConfig({
  devServer: {
    port: 3000,
  },
  sourcemap: {
    server: true,
    client: true,
  },

  ssr: true,

  runtimeConfig: {
    tokenLeads: 'c8e2d508767bd48d929b8d63641eaf80',
    database: {
      username: 'postgres',
      password: '1',
      host: '127.0.0.1',
      port: 5432,
      database: 'partnerCRM',
    },
    token_leads: 'c8e2d508767bd48d929b8d63641eaf80',
    secret_key: 'yOzPacWqItuzr0sg5AVMG7dsIfCaoAj0C6Z6GFt5lrKLLxHWl3jlAfWkGlWhSgFz13i50S2lVYTwB3qC',
    saltRounds: 11,
    password_admin_start: 'admin',
    sessionOptions: {
      maxAge: 60 * 60 * 12, // время жизни(12 часов)
      httpOnly: false, //
      path: '/',
      sameSite: true,
      secure: false, // Позволяет получать куки не только через https
    },
    notAuth: true, // Проверять ли авторизацию
  },

  css: ['~/assets/css/main.css', 'primevue/resources/themes/aura-light-blue/theme.css', 'primeicons/primeicons.css'],

  nitro: {
    compressPublicAssets: true,
    serverAssets: [
      {
        baseName: 'img',
        dir: './public/img',
      },
    ],
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  modules: ['@nuxtjs/tailwindcss', 'nuxt-primevue', 'nuxt-icons', '@pinia/nuxt', '@nuxt/image'],
  primevue: {
    cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    components: {
      exclude: ['Editor', 'Chart'],
    },
    options: {
      locale: {
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        monthNames: [
          'Январь',
          'Февраль',
          'Март',
          'Апрель',
          'Май',
          'Июнь',
          'Июль',
          'Август',
          'Сентябрь',
          'Октябрь',
          'Ноябрь',
          'Декабрь',
        ],
        dayNamesdayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      },
    },
  },

  typescript: {
    // typeCheck: true,
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false,
      },
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});