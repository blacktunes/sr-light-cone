export const getRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const getDetails = () =>
  ({
    name: '',
    info: '',
    state: [
      {
        hp: getRandom(40, 60).toString(),
        atk: getRandom(15, 30).toString(),
        def: getRandom(15, 30).toString(),
        skill: ''
      },
      {
        hp: getRandom(900, 1200).toString(),
        atk: getRandom(350, 500).toString(),
        def: getRandom(350, 500).toString(),
        skill: ''
      }
    ]
  }) as LightConeDetails
