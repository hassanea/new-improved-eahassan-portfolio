<template>
  <div class="ribbon">
    <span>
      <slot />
    </span>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="css" scoped>
  /* REFERENCE: https://www.cssportal.com/css-ribbon-generator/ */

  .ribbon {
    position: absolute;
    right: -5px;
    top: -5px;
    z-index: 1;
    overflow: hidden;
    width: 75px;
    height: 75px;
    text-align: right;
  }

  .ribbon span {
    font-size: 0.75rem;
    font-weight: bold;
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    line-height: 20px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    width: 100px;
    display: block;
    background: #79a70a;
    background: linear-gradient(#00008b 0%, #00008b 100%);
    box-shadow: 0 3px 10px -5px rgba(0, 0, 0, 1);
    position: absolute;
    top: 19px;
    right: -21px;
  }

  .ribbon span::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    z-index: -1;
    border-left: 3px solid #00008b;
    border-right: 3px solid transparent;
    border-bottom: 3px solid transparent;
    border-top: 3px solid #00008b;
  }

  .ribbon span::after {
    content: '';
    position: absolute;
    right: 0px;
    top: 100%;
    z-index: -1;
    border-left: 3px solid transparent;
    border-right: 3px solid #00008b;
    border-bottom: 3px solid transparent;
    border-top: 3px solid #00008b;
  }
</style>
