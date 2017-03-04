## Snake Project
A simple implementation of `snake`.

### Notes
- Vanilla JS (no `jQuery` or other frontend frameworks)
- ES6, compiled by `webpack`
- Tested only with `Google Chrome` on `OSX`

### Demo
[https://snake.patrickdevivo.com/](https://snake.patrickdevivo.com/)

### Running Instructions
1. Clone repository
2. `npm install`
3. `npm dev` (to get initial build) then run an http server serving the project root (I use [Zeit's serve](https://github.com/zeit/serve))
	- `npm install -g serve`
	- `cd snake-project` and `serve`

### Next Steps
- Explain more in code comments
- Consistent coordinate handling (sometimes coordinates are passed as an object `{r: 89, c: 25}`, sometimes as separate parameters `myFunction(r, c)`. Choose one and stick with it.
- Build an `info` area next to the board that shows
	- time playing
	- snake size
	- pause / resume buttons
	- reset button (when game ends)
	- difficulty adjuster - modifies the frame rate of the game to move the snake either fast or slower
- Currently there is a `moveQueue` array that grows arbitrarily with each frame render (to keep track of upcoming moves in the snake's body). This array really only needs to be the current length of the snake and no more. It should be limited, otherwise this could be considered a "memory leak."