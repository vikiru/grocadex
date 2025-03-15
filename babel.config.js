module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
            'nativewind/babel',
        ],
        plugins: [
            '@tamagui/babel-plugin',
            'react-native-reanimated/plugin',
            ['react-native-paper/babel'],
        ],
    };
};
