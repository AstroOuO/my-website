import * as migration_20260611_160453_initial_schema from './20260611_160453_initial_schema';
import * as migration_20260612_000535_add_about_me_block from './20260612_000535_add_about_me_block';

export const migrations = [
  {
    up: migration_20260611_160453_initial_schema.up,
    down: migration_20260611_160453_initial_schema.down,
    name: '20260611_160453_initial_schema',
  },
  {
    up: migration_20260612_000535_add_about_me_block.up,
    down: migration_20260612_000535_add_about_me_block.down,
    name: '20260612_000535_add_about_me_block'
  },
];
