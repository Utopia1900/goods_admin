<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <div slot="header"></div>
      <ul class="nav">
        <template v-for="(item, index) in navItems">
          <template v-if="item.title">
            <SidebarNavTitle :name="item.name" :classes="item.class" :wrapper="item.wrapper"/>
          </template>
          <template v-else-if="item.divider">
            <SidebarNavDivider :classes="item.class"/>
          </template>
          <template v-else-if="item.label">
            <SidebarNavLabel :name="item.name" :url="item.url" :icon="item.icon" :label="item.label" :classes="item.class"/>
          </template>
          <template v-else>
            <template v-if="item.children">
              <!-- First level dropdown -->
              <SidebarNavDropdown :name="item.name" :url="item.url" :icon="item.icon">
                <template v-for="(childL1, index) in item.children">
                  <template v-if="childL1.children">
                    <!-- Second level dropdown -->
                    <SidebarNavDropdown :name="childL1.name" :url="childL1.url" :icon="childL1.icon">
                      <li class="nav-item" v-for="(childL2, index) in childL1.children">
                        <SidebarNavLink :name="childL2.name" :url="childL2.url" :icon="childL2.icon" :badge="childL2.badge" :variant="item.variant"/>
                      </li>
                    </SidebarNavDropdown>
                  </template>
                  <template v-else>
                    <SidebarNavItem :classes="item.class">
                      <SidebarNavLink :name="childL1.name" :url="childL1.url" :icon="childL1.icon" :badge="childL1.badge" :variant="item.variant"/>
                    </SidebarNavItem>
                  </template>
                </template>
              </SidebarNavDropdown>
            </template>
            <template v-else>
              <SidebarNavItem :classes="item.class">
                <SidebarNavLink :name="item.name" :url="item.url" :icon="item.icon" :badge="item.badge" :variant="item.variant"/>
              </SidebarNavItem>
            </template>
          </template>

        </template>
      </ul>
      <slot></slot>
    </nav>
    <SidebarMinimizer/>
  </div>
</template>
<script>
  import SidebarMinimizer from './SidebarMinimizer'
  import SidebarNavDivider from './SidebarNavDivider'
  import SidebarNavDropdown from './SidebarNavDropdown'
  import SidebarNavLink from './SidebarNavLink'
  import SidebarNavTitle from './SidebarNavTitle'
  import SidebarNavItem from './SidebarNavItem'
  import SidebarNavLabel from './SidebarNavLabel'
  export default {
    name: 'sidebar',
    props: {
      navItems: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    components: {
      SidebarMinimizer,
      SidebarNavDivider,
      SidebarNavDropdown,
      SidebarNavLink,
      SidebarNavTitle,
      SidebarNavItem,
      SidebarNavLabel
    },
    methods: {
      handleClick(){
        // e.preventDefault()
        // e.target.parentElement.classList.toggle('open')
        console.log('hello world')
      }
    }
  }
</script>

<style lang="css">
  .nav-link {
    cursor:pointer;
  }
  .sidebar .nav-dropdown-items .nav-item {
    text-indent: 12px;
  }
  .sidebar .nav-dropdown-items .nav-item i {
    margin-right: 15px;
  }
</style>
