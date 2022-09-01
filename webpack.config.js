const path = require('path');

module.exports = {
    //путь до входной точки
    entry: './src/main.js',
    //куда следует поместить результат работы
    output: {
        //путь жо директории path.resolve важно использовать
        path: path.resolve(__dirname, 'dist'),
        //имя файла со сборкой
        filename: 'bundle.js'
    }
}