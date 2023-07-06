import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-imagen-ubicacion',
  templateUrl: './imagen-ubicacion.component.html',
  styleUrls: ['./imagen-ubicacion.component.scss']
})
export class ImagenUbicacionComponent {
  constructor(private renderer: Renderer2) {
  }

  onClick(event: MouseEvent) {
    const x = event.offsetX;
    const y = event.offsetY;

    // Define the region by creating an SVG path element
    const path = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(path, 'd', 'M100,100 L200,100 L200,200 L100,200 Z');
    const region = this.renderer.createElement('svg');
    this.renderer.setAttribute(region, 'width', '300');
    this.renderer.setAttribute(region, 'height', '300');
    this.renderer.setStyle(region, 'position', 'absolute');
    this.renderer.setStyle(region, 'left', '0');
    this.renderer.setStyle(region, 'top', '0');
    this.renderer.appendChild(region, path);

    if (this.isInsideRegion(region, x, y)) {

      const div = this.renderer.createElement('div');
      this.renderer.setStyle(div, 'position', 'absolute');
      this.renderer.setStyle(div, 'display', 'block');
      this.renderer.setStyle(div, 'left', `${x}px`);
      this.renderer.setStyle(div, 'top', `${y}px`);
      this.renderer.setStyle(div, 'background-color', 'red');
      this.renderer.setStyle(div, 'width', '10px');
      this.renderer.setStyle(div, 'height', '10px');
      const imagen = document.getElementById("locationOfImage");
      this.renderer.appendChild(imagen, div);
      console.log("in region");
    }else {

      console.log("out region");
    }
    console.log(`${x} ${y}`);

  }
  isInsideRegion(region: any, x: number, y: number): boolean {
    const bbox = region.getBoundingClientRect();
    const svg = region.firstChild;
    const point = svg.ownerSVGElement.createSVGPoint();
    point.x = x - bbox.left;
    point.y = y - bbox.top;
    return svg.isPointInFill(point);
  }
}
