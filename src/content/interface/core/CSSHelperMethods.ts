
import type * as Core from './core.types';

export const units: Core.SizeUnit[] = ['cm','mm','in','px','pd','pc','em','ex','ch','rem','vw','vh','vmin','vmax','%'];

export function normalizeKeyUnitPair(pair: Core.KeyUnitPair): Core.KeyUnitPair {
    if (pair[0] === undefined || pair[0] as any === '') pair[0] = 0;
    if (pair[1] === undefined || !units.includes(pair[1])) pair[1] = 'px';
    return pair;
}