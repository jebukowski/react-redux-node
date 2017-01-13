import * as sessionSagas from './session';
import * as detailsSagas from './details';

const mapImportsToArray = (imports) => Object.keys(imports).map(key => imports[key]());

export default function*() {
  yield [
    ...mapImportsToArray(sessionSagas),
    ...mapImportsToArray(detailsSagas),
  ];
}
