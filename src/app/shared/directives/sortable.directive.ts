import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Dependencia, Area, Convenio } from '../../shared/interface/dependencia';

export type SortColumn = keyof Dependencia | '';
export type SortColumnArea = keyof Area | '';
export type SortColumnConvenio = keyof Convenio | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

export interface SortEvent {
    column: SortColumn;
    direction: SortDirection;
}

export interface SortEventArea {
    column: SortColumnArea;
    direction: SortDirection;
}

export interface SortEventConvenio {
    column: SortColumnConvenio;
    direction: SortDirection;
}

@Directive({
    selector: 'th[sortable]',
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotate()',
    },
})

export class NgbdSortableHeader {

    @Input() sortable: SortColumn = '';
    @Input() direction: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();

    rotate() {
        this.direction = rotate[this.direction];
        this.sort.emit({ column: this.sortable, direction: this.direction });
    }
}
