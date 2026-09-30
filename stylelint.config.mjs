export default {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recess-order",
    "stylelint-config-prettier-scss",
  ],
  rules: {
    // Порядок свойств приходит из stylelint-config-recess-order:
    // позиционирование → блочная модель → типографика → визуал.
    // Поэтому position всегда раньше background, а не наоборот.
    //
    // Проект именует классы по компоненту в PascalCase (.Navbar, .AppLink),
    // модификаторы — в camelCase (.mainLink, .collapsed).
    "selector-class-pattern": null,

    // Связанные по смыслу декларации разбиваются пустой строкой
    // (шрифты отдельно, цвета отдельно, размеры отдельно).
    "declaration-empty-line-before": null,
    "custom-property-empty-line-before": null,

    // Имена шрифтов (Consolas) — идентификаторы, а не ключевые слова,
    // регистр в них значим. Значения лежат в кастом-свойствах --font-*.
    "value-keyword-case": [
      "lower",
      {
        camelCaseSvgKeywords: true,
        ignoreProperties: ["font", "font-family", "/^--font/"],
      },
    ],
  },
};
