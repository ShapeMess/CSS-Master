
import type * as Core from './core.types';

export const units: Core.Unit[] = ['cm','mm','in','px','pd','pc','em','ex','ch','rem','vw','vh','vmin','vmax','%'];
export const unitFilter = new RegExp(units.join("|"), 'gi');

export function normalizeKeyUnitPair(pair: Core.KeyUnitPair): Core.KeyUnitPair {
    if (pair[0] === undefined || pair[0] === null || pair[0] as any === '') pair[0] = 0;
    if (pair[1] === undefined || pair[0] === null || !units.includes(pair[1])) pair[1] = 'px';
    return pair;
}

/**
 * Removes CSS units from a string.
 */
export function removeUnits(value: string): string {
    value = value.replace(unitFilter, '');
    return `${parseInt(value)}`;
} 