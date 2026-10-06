// Мок CSS Modules: обращение к любому классу возвращает его имя,
// поэтому cls.foo === "foo" и в ассертах видно исходное имя класса,
// а не хеш из прод-сборки.
//
// identity-obj-proxy здесь не подходит: он отдаёт __esModule === false,
// из-за чего TypeScript оборачивает модуль в __importStar и копирует
// собственные ключи. У Proxy над пустым объектом их нет, поэтому
// `import * as cls` превращается в {} и все cls.foo дают undefined.

// Свойства, которые не должны выглядеть как классы.
const IGNORED_KEYS = new Set(["then", "constructor", "toJSON", "nodeType", "tagName", "$$typeof"]);

const handler = {
  get(target, key) {
    if (typeof key === "symbol") {
      return Reflect.get(target, key);
    }

    // Для non-configurable свойств геттер обязан вернуть их реальное
    // значение, иначе Proxy бросает TypeError.
    if (key === "__esModule") {
      return true;
    }

    if (key === "default") {
      return classNames;
    }

    if (IGNORED_KEYS.has(key)) {
      return undefined;
    }

    return key;
  },
};

const classNames = new Proxy({}, handler);

// __esModule: true заставляет TS отдать сам Proxy вместо его копии,
// default покрывает import cls from "./X.module.scss".
Object.defineProperties(classNames, {
  __esModule: { value: true },
  default: { value: classNames },
});

module.exports = classNames;
