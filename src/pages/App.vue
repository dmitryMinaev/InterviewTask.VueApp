<template>
  <div>
    <div>
      <nav
        class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-dark border-bottom box-shadow mb-3 "
      >
        <div class="container">
          <router-link
            class="navbar-brand text-white"
            :to="{ name: 'crawling' }"
            >InterviewTask.WebApp</router-link
          >
          <div
            class="navbar-collapse collapse d-sm-inline-flex justify-content-between"
          >
            <ul class="navbar-nav flex-grow-1">
              <li class="nav-item">
                <router-link
                  class="nav-link text-white"
                  :to="{ name: 'crawling' }"
                >
                  Crawling
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <router-view class="container"></router-view>
  </div>
</template>

<script>
export default {};
</script>
