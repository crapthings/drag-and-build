import d3 from 'd3'

import faker from 'faker'

export default class Boot {

  constructor(container) {
    this.init()
    this.initDrag()
    this.buildContainer(container)
    this.buildComponentsPanel()
    this.buildCompositonsPanel()
    this.buildPropertiesPanel()
    this.buildComponents()
  }

  init = () => {
    this.$body = d3.select(document.body)
      .style('background-color', '#efefef')
  }

  initDrag = () => {
    this.currentDragElement = null
    this.currentDropElement = null
  }

  buildContainer = container => {
    this.$container = d3.select(container)
      .style('display', 'flex')

    this.$clonePlaceholder = this.$container
      .append('div')
      .attr('class', 'clone-placeholder')
  }

  buildComponentsPanel = () => {
    this.$componentsPanel = this.$container
      .append('div')
      .attr('id', 'components-panel')
      .style('width', '80px')
  }

  buildCompositonsPanel = () => {
    const that = this

    this.$compositonsPanel = this.$container
      .append('div')
      .attr('id', 'compositons-panel')
      .style('margin', '0 auto')
      .style('width', '960px')

    this.$compositonsArea = this.$compositonsPanel
      .append('div')
      .attr('id', 'compositons-area')
      .attr('class', 'droppable')
      .style('padding', '32px')

    d3.selectAll('.droppable').on('mouseover', function () {
      if (!that.currentDragElement) return

      d3.selectAll('.droppable').style('background-color', null)

      that.currentDropElement = d3.select(this)

      that.currentDropElement.style('background-color', 'rgba(0, 255, 0, .1)')
    })

    d3.selectAll('.droppable').on('mouseleave', function () {
      if (!that.currentDragElement) return
      d3
        .selectAll('.droppable')
        .style('background-color', null)

      that.currentDropElement = null
    })
  }

  buildPropertiesPanel = () => {
    this.$propertiesPanel = this.$container
      .append('div')
      .attr('id', 'properties-panel')
      .style('width', '240px')
  }

  buildComponents = () => {
    const that = this

    let offsetX = 0
    let offsetY = 0
    let x = 0
    let y = 0

    const drag = d3.drag()
      .on('start', function () {
        offsetX = this.offsetLeft
        offsetY = this.offsetTop
        console.log(offsetX, offsetY)
        x = d3.mouse(this)[0]
        y = d3.mouse(this)[1]
        that.currentDragElement = d3.select(this)
        that.currentDragElement.style('pointer-events', 'none')
      })
      .on('drag', function () {
        const { pageX, pageY } = d3.event.sourceEvent
        that
          .currentDragElement
          .style('transform', `translate(${pageX - x}px, ${pageY - y - offsetY}px)`)
      })
      .on('end', function () {
        const edrag = that.currentDragElement
        const edrop = that.currentDropElement

        // if (!edrop) return

        edrag.style('pointer-events', null)
        edrag.style('transform', null)

        if (edrag.attr('data-type') === 'block') {
          edrop
            .append('div')
            .attr('class', 'droppable area-block')
            .style('outline', '1px solid skyblue')
            .style('min-height', '1em')
            .style('padding', '16px')
            .on('mouseover', function () {
              if (!that.currentDragElement) return
              console.log(d3.event.stopPropagation())
              d3.selectAll('.droppable').style('background-color', null)
              that.currentDropElement = d3.select(this)
              that.currentDropElement.style('background-color', 'rgba(0, 255, 0, .1)')
            })

          // that.buildEvents()
        }

        if (edrag.attr('data-type') === 'text') {
          edrop
            .append('span')
            .attr('contenteditable', 'true')
            .style('outline', 'none')
            .text(faker.lorem.sentences())
        }

        d3.selectAll('.droppable').style('background-color', null)

        that.initDrag()
      })

    const blockComp = this.$componentsPanel
      .append('div')
      .attr('class', 'components')
      .attr('data-type', 'block')
      .style('padding', '16px')
      .text('block')

    const textComp = this.$componentsPanel
      .append('div')
      .attr('class', 'components')
      .attr('data-type', 'text')
      .style('padding', '16px')
      .text('text')

    this.$componentsPanel.selectAll('.components').call(drag)
  }

  buildEvents = () => {
    const that = this

    d3
      .selectAll('.droppable')
      .on('mouseover', function () {
        if (!that.currentDragElement) return
        console.log('in area block')
        d3.selectAll('.droppable').style('background-color', null)
        that.currentDropElement = d3.select(this)
        that.currentDropElement.style('background-color', 'rgba(0, 255, 0, .1)')
      })
  }

}
