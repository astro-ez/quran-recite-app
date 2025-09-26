export const endpoints = {
    auth: {
        login: "/oauth2/token",
    },

    surahs: {
        list: "/v4/chapters",
    },

    verse: {
        list: "/v4/verses/by_chapter"
    },

    recite: {
        list: "/v4/resources/recitations",
        audio: '/v4/chapter_recitations'
    }
}