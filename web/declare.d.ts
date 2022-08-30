declare module 'mixin-deep' {
  type MixinDeep = (...res: any[]) => void;
  let mixinDeep: MixinDeep;
  export default mixinDeep;
}
