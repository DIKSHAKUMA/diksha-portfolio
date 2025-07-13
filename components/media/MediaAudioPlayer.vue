<script setup lang="ts">
/**
 * An even more slimmed down version of the player.
 */

import { ref, useTemplateRef, reactive, watch, onMounted, computed } from 'vue'
import { useStoreRef } from '@/composable/useStoreRef'

const spectrum = useTemplateRef('spectrum')
const audioEl = useTemplateRef('audio-element')
const trackTime = ref<string>("00:00")
const trackDuration = ref<string>("00.00")
const trackIndex = ref<number>(0)
const currentTrack = ref<string>("")
const isPlaying = ref<boolean>(false)
const panelTrack = useTemplateRef('panel-track')
const isMounted = ref<boolean>(false);

const doPlay = ref<boolean>(false)
const title = ref<string>("Sound")

// The panel width, if track text wider then GSAP yoyo
const TRACK_WIDTH = 145

const PATH = useRuntimeConfig().public.s3Path
const { $gsap } = useNuxtApp()



//Add tracks here; no plans to make a DOM playlist
const playlist = reactive([
    { artist: "Oscuro", track: "Oscuro - BlauDisS - Openness.mp3" },
    { artist: "Unseen Elementz", track: "Unseen Elementz - Waiting (Future Garage).mp3" },
    { artist: "Tomokari & PALMS HIGH", track: "Tomokari & PALMS HIGH - Rumours.mp3" },
    { artist: "Progmalite", track: "Progmalite - Statica - Single.mp3" }
])

// Check for remaining tracks
const ifTrackNext = computed(() => {
    return trackIndex.value < playlist.length - 1
})

const ifTrackPrev = computed(() => {
    return trackIndex.value > 0
})

// Check for current track
const currTrack = computed(() => {
    return playlist[trackIndex.value].track
})

const togglePlay = () => {
    isPlaying.value = !isPlaying.value
    if (isPlaying.value && audioEl.value) {
        playTrack()
    } else if (audioEl.value) {
        audioEl.value.pause()
    }
}

// For previous and next we need to know if track is playing when we press them
const nextTrack = () => {
    if (ifTrackNext.value && !isPlaying.value) {
        trackIndex.value++
        currentTrack.value = currTrack.value
    } else if (ifTrackNext.value) {
        isPlaying.value = true
        trackIndex.value++
        playTrack()
    }
}

const prevTrack = () => {
    if (ifTrackPrev.value && !isPlaying.value) {
        trackIndex.value--
        currentTrack.value = currTrack.value
    } else if (ifTrackPrev.value) {
        isPlaying.value = true
        trackIndex.value--
        playTrack()
    }
}

const playTrack = () => {
    // Vueuse, easy cancel. oncanplaythrough does not work on mobile, loadedmetadata does???
    const cancelcan = useEventListener(
        audioEl.value as unknown as MaybeRef,
        "loadedmetadata",
        () => {
            audioEl.value?.play()
            cancelcan()
        }
    )
    // Synchronous, so we do this after adding event
    isPlaying.value = true
    audioEl.value!.currentTime = 0
    currentTrack.value = currTrack.value
    audioEl.value?.load()
}

// E from v-on listener
const timeUpdate = () => {
    setTimes()
}

// Times, leaving this in, in case you want to use
const setTimes = () => {
    const m = ('0' + Math.floor((audioEl.value!.currentTime / 60) % 60)).slice(
        -2
    )
    const s = ('0' + Math.floor(audioEl.value!.currentTime % 60)).slice(-2)
    trackTime.value = `${m}:${s}`
}

// E from v-on listener, leaving this in, in case you want to use
const durationUpdate = () => {
    const m = ("0" + Math.floor((audioEl.value!.duration / 60) % 60)).slice(-2)
    const s = ("0" + Math.floor(audioEl.value!.duration % 60)).slice(-2)
    trackDuration.value = `${m}:${s}`
}

const onTrackEnded = () => {
    if (ifTrackNext.value && spectrum.value) {
        trackIndex.value++
        playTrack()
    } else if (audioEl.value && spectrum.value) {
        trackIndex.value = 0
        audioEl.value.pause()
        audioEl.value.currentTime = 0
        currentTrack.value = currTrack.value
        // we have played 'all' tracks set model value false
        doPlay.value = false;
    }
}

// Watch our v-model for update of checked ref
watch(() => doPlay.value, (newValue, oldValue) => {
    togglePlay();
})

// GSAP, yoyo text left to right if title wider than display
watch(
    [isPlaying, trackIndex],
    () => {
        const { width } = panelTrack.value?.getBoundingClientRect() || {}
        if (isPlaying.value && (width && width > TRACK_WIDTH)) {
            const remWidth = width - TRACK_WIDTH + 10
            $gsap.fromTo(".panel__box__track", { x: 0 }, {
                duration: width / 100, x: -remWidth, repeat: -1, yoyo: true, ease: "sine.inOut"
            })
        } else {
            $gsap.to(".panel__box__track", { x: 0, duration: 1, ease: "sine.inOut", overwrite: 'auto' })
        }
    }, { flush: 'post' }
)

onMounted(() => {
    const { addElem } = useStoreRef()
    addElem("audioEl", audioEl)
    currentTrack.value = currTrack.value
    isMounted.value = true

})

</script>

<template>
    <div class="player-wrapper">
        <div v-if="isMounted">
            <audio type="audio/mp3" :src="`${PATH}/${currentTrack}`" preload="auto" v-on:timeupdate="timeUpdate"
                v-on:durationchange="durationUpdate" v-on:ended="onTrackEnded" ref="audio-element"
                crossorigin="anonymous"></audio>
        </div>
        <div class="panel">
            <div class="panel__box">
                <div :class="{ 'panel__box__track--paused': !isPlaying }" class="panel__box__track" ref="panel-track">{{
                    currentTrack }}</div>
            </div>
        </div>
        <div class="controls">
            <UIAudioToggle v-model="doPlay" :title />
        </div>
        <div v-if="audioEl">
            <MediaAudioVisualizer ref="spectrum" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.player-wrapper {
    width: 240px;
    height: 50px;
    -webkit-overflow-scrolling: none;
    overflow: hidden;
    overscroll-behavior: none;
}

.panel {
    position: relative;
    width: -moz-fit-content;
    width: fit-content;
    color: $accent2;
    border-radius: 25px;
    top: 26px;
    right: -57px;

    &__box {
        position: relative;
        width: 145px;
        border-radius: 4px;
        padding: 0 5px 0 5px;
        overflow: hidden;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;

        &__track {
            white-space: nowrap;
            text-align: center;
            width: -moz-fit-content;
            width: fit-content;
            font-size: $fs-10;
        }

        &__track--paused {
            display:none;
        }
    }
}

.controls {
    height: inherit;
    width: inherit;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
