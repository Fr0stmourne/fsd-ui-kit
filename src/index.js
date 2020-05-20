import 'jquery/dist/jquery';
import 'normalize.css';
import 'webpack-jquery-ui';

function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('./vendors/', true, /\.js$/));
importAll(require.context('./components/', true, /\.js$/));
importAll(require.context('./pages/', true, /\.js$/));
importAll(require.context('./', true, /\.scss$/));
importAll(require.context('./', true, /\.(jpeg|jpg|png|gif|svg)$/));
