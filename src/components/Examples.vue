<template>
    <div class="flex gap-4 p-2 rounded-md" style="background-color: #232323">
        <div
            v-for="pattern in patterns"
            @click="emit('selectPattern', pattern.data)"
            class="w-8 h-8 cursor-pointer"
            :style="pattern.css"
        ></div>
    </div>
</template>

<script setup>

const emit = defineEmits(['selectPattern'])

const patterns = [
    {
        data: '5;4;transparent;transparent;transparent;transparent;transparent;transparent;#216cc7;#ffffff;#f93d54;transparent;transparent;#216cc7;#ffffff;#f93d54;transparent;transparent;#216cc7;#ffffff;#f93d54;transparent;transparent;transparent;transparent;transparent;transparent',
        css: 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAENJREFUOE9jZKAyYKSyeQxD0EDFnOP/kYPh3mQLlFD5ZReKwmc/vAbFlxheHjWQYTQMGUaTDQP9cwqlxdkQLL4o9TIAjFxUFf3hKPMAAAAASUVORK5CYII=)'
    },
    {
        data: '8;2;#f93d54;#000000;#000000;transparent;transparent;transparent;#f93d54;#000000;#f93d54;transparent;transparent;transparent;transparent;transparent;transparent;#000000;transparent;transparent;transparent;#000000;#000000;transparent;transparent;transparent;transparent;transparent;transparent;transparent;#f93d54;transparent;transparent;transparent;transparent;transparent;#000000;transparent;transparent;transparent;#000000;transparent;transparent;transparent;#000000;transparent;transparent;transparent;#000000;#f93d54;transparent;transparent;#f93d54;#f93d54;transparent;transparent;#000000;#000000;#000000;transparent;transparent;transparent;transparent;transparent;#f93d54;transparent',
        css: 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHxJREFUOE9j/Gkb8p+BgYGB/fAaEIUMGNEFQHx09YzUNACrjdhcARUDuxzZBeQZQMgGJHmsFuCzFexESgwA60UKZJJdQLYBMKfj8h6KPDZF9DHgp20I2ItkuwCnAbBQh0Uf++E16JagRC+GC8gxgFCgoaQm9HQBcgFFBgAAJBxDHY/j2M0AAAAASUVORK5CYII=)'
    },
    {
        css: 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAENJREFUOE9jZKAQMFKon2FwGvAf6i1012EVx+aFYWAASTFL1WjEFXjoLkJRh+wCig2A2QQzCFdYoHgbXzog2wD6xgIAMI0OEWP8GZEAAAAASUVORK5CYII=)',
        data: '8;2;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;#000000;transparent;transparent;#000000;transparent;transparent;transparent;transparent;#000000;transparent;transparent;#000000;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;#000000;transparent;transparent;transparent;transparent;#000000;transparent;transparent;transparent;#000000;#000000;#000000;#000000;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent'
    },
    {
        css: 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAItJREFUOE+Nk1EOwCAIQ+f9D70FM5auPNH9LClYaovjqt8NWECDcAKDwPEkLf0K6OTA/RARf5NcthMn4ZGCbMqJ/v9Zoc1ZUPmKobcrD8h1vKYrwKiaqAcpWEXrPLNvR9ClMwndcZ+i2bd7kAex6S3iNtLKdkaWAbRxqsavWeLtCJwIX+SJicunHIUHfdQlEajPXQoAAAAASUVORK5CYII=)',
        data: '16;1;transparent;transparent;transparent;transparent;#000000;#000000;#000000;#000000;#000000;#000000;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;#000000;transparent;transparent;transparent;transparent;#000000;#000000;transparent;transparent;transparent;transparent;transparent;transparent;transparent;#000000;#000000;#000000;transparent;#000000;#000000;transparent;transparent;#000000;transparent;transparent;transparent;transparent;transparent;transparent;#000000;#000000;#000000;#000000;transparent;transparent;transparent;#000000;transparent;#000000;transparent;transparent;transparent;transparent;transparent;transparent;transparent;#000000;#000000;transparent;transparent;#000000;transparent;#000000;transparent;#000000;transparent;transparent;transparent;transparent;transparent;transparent;#000000;#000000;#000000;transparent;#000000;#000000;#000000;#000000;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;#000000;#000000;#000000;#000000;transparent;transparent;transparent;transparent;#000000;#000000;#000000;#000000;transparent;transparent;transparent;#000000;#000000;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;#000000;#000000;transparent;transparent;transparent;#000000;#000000;transparent;transparent;transparent;transparent;transparent;#000000;#000000;#000000;#000000;#000000;transparent;transparent;transparent;transparent;#000000;#000000;transparent;transparent;transparent;#000000;#000000;#000000;#000000;transparent;transparent;transparent;transparent;transparent;transparent;#000000;transparent;transparent;transparent;transparent;transparent;#000000;transparent;transparent;#000000;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;#000000;transparent;transparent;transparent;transparent;transparent;transparent;#000000;#000000;transparent;transparent;transparent;transparent;transparent;transparent;transparent;#000000;transparent;transparent;transparent;transparent;transparent;transparent;transparent;#000000;transparent;transparent;transparent;transparent;transparent;transparent;#000000;transparent;transparent;transparent;#000000;#000000;transparent;transparent;#000000;#000000;transparent;transparent;transparent;transparent;transparent;transparent;#000000;transparent;transparent;transparent;transparent;transparent;#000000;#000000;#000000;transparent;transparent;transparent;transparent;transparent;transparent;#000000;transparent;transparent;transparent;transparent;transparent;#000000;#000000;transparent;transparent;transparent;transparent;transparent;transparent;transparent'
    },
    {
        css: 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAC1JREFUKFNjZCAAGEHyijnH/9+fYglmwwBMDEUQm2EYukCKkE0jTQFOKyhyJABAwBgJ06K/3gAAAABJRU5ErkJggg==)',
        data: '8;1;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;#216cc7;transparent;transparent;transparent;transparent;#216cc7;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;#216cc7;#216cc7;transparent;transparent;transparent;transparent;transparent;transparent;#216cc7;#216cc7;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;#216cc7;transparent;transparent;transparent;transparent;#216cc7;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent;transparent'
    },
    {
        css: 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAE1JREFUOE9jFLYt/M+AB2xpD0aRfZlWhk85A+OogQx8+mEoYXRvsgUK/5ddKAp/+9tnKHyMMBw1kGE0DBlGkw0D/XMKemE3Wh4yEKoCALa/iZEoBYhuAAAAAElFTkSuQmCC)',
        data: '5;4;#133D71;#133D71;#C7C4C4;#B02A3A;#B02A3A;#133D71;#216cc7;#ffffff;#f93d54;#B02A3A;#133D71;#216cc7;#ffffff;#f93d54;#B02A3A;#133D71;#216cc7;#ffffff;#f93d54;#B02A3A;#133D71;#133D71;#C7C4C4;#B02A3A;#B02A3A'
    }
]
</script>