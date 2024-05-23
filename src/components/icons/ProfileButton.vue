<template>
  <div class="to-buy-screen">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="profile">
      <g fill-rule="evenodd">
        <g transform="translate(-420 -2159)">
          <g transform="translate(56 160)">
            <path
                d="M374 2009c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4m3.758.673A5.983 5.983 0 0 0 380 2005a6 6 0 1 0-9.758 4.673c-3.659 1.375-6.242 4.772-6.242 9.327h2c0-5 3.589-8 8-8s8 3 8 8h2c0-4.555-2.583-7.952-6.242-9.327"></path>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.to-buy-screen {
  width: 36px;
  height: 36px;
  border: solid 1px var(--accent-low);
  border-radius: 8px;
  padding: 5px;
  background-color: var(--background-clickable);
  cursor: pointer;
  fill: var(--icon-primary);
  transition: background-color 100ms, color 100ms;
}

.to-buy-screen:hover {
  background-color: var(--background-clickable-highlighted);
  border: solid 1px var(--accent-middle);
}

.to-buy-screen:active {
  fill: var(--accent-high);
  border: solid 1px var(--accent-high);
}

svg {
  width: 24px;
  height: 24px;
}

@media (min-width: 1024px) {
  .to-buy-screen {
    width: 46px;
    height: 46px;
    padding: 8px;
    border-radius: 8px;
  }

  svg {
    width: 28px;
    height: 28px;
  }
}
</style>