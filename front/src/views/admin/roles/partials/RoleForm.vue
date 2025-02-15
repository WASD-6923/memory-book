<script lang="ts" setup>
import FieldError from '@/components/errors/FieldError.vue'
import {
  Permission,
  PermissionColumns,
  PermissionGroup,
  SortOrder,
  usePermissionsQuery,
  useRoleUpdateMutation,
} from '@/generated/graphqlOperations.js'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useErrorsStore } from '@/stores/useErrors.js'
import { useToast } from 'primevue/usetoast'

const errStore = useErrorsStore()
const toast = useToast()
const router = useRouter()
const props = defineProps({
  modelValue: {
    type: Object,
  },
  mode: {
    type: String,
    required: false,
    default: 'update',
  },
})

interface Perm {
  id: string
  name: string
  group: PermissionGroup
  value: boolean
}

const availablePermissions = ref<Array<Perm>>()
const { onResult: onResultPermissions } = usePermissionsQuery(
  {
    orderBy: [{ column: PermissionColumns.Name, order: SortOrder.Asc }],
  },
  { fetchPolicy: 'no-cache' },
)

onResultPermissions((result) => {
  if (result.data) {
    availablePermissions.value = result.data.permissions.map((perm: Permission) => {
      const exists = props.modelValue.permissions?.find((p: Permission) => p.id === perm.id)
      const response: Perm = {
        id: perm.id,
        name: perm.name,
        group: perm.group,
        value: false,
      }
      if (exists) {
        response.value = true
      }
      return response
    })
  }
})

const localModel = ref({ ...props.modelValue })
const menuPermissions = computed(() =>
  availablePermissions.value?.filter((perm: Perm) => perm.group === PermissionGroup.Menu),
)
const adminPermissions = computed(() =>
  availablePermissions.value?.filter((perm: Perm) => perm.group === PermissionGroup.Admin),
)

const dictionaryPermissions = computed(() =>
  availablePermissions.value?.filter((perm: Perm) => perm.group === PermissionGroup.Dictionary),
)

const { mutate: updateMutation, onDone: onDoneUpdate } = useRoleUpdateMutation()
onDoneUpdate((result) => {
  if (result.data) {
    errStore.$reset()
    toast.add({
      severity: 'success',
      summary: 'Успех',
      detail: 'Роль успешно изменена',
      life: 3000,
    })
    router.push({ name: 'adminRoles' })
  }
})
const handleSave = () => {
  updateMutation({
    id: localModel.value.id,
    input: {
      name: localModel.value.name,
      guard_name: 'api',
      permissions: {
        sync: availablePermissions.value?.filter((p: Perm) => p.value).map((p: Perm) => p.id),
      },
    },
  })
}

const handleClose = () => {
  errStore.$reset()
  router.push({ name: 'adminRoles' })
}
</script>

<template>
  <form @submit.prevent="handleSave">
    <div
      v-if="localModel"
      class="p-fluid formgrid grid"
    >
      <div class="field col-12 md:col-12">
        <label for="short_name">Название</label>
        <InputText v-model="localModel.name" />
        <FieldError field-name="input.name" />
      </div>

      <div class="col-12 text-xl mb-2">Разрешения на пункты меню</div>
      <div
        v-for="(p, i) in menuPermissions"
        v-bind:key="i"
        class="field col-6 md:col-3"
      >
        <Checkbox
          v-model="p.value"
          :binary="true"
        />
        {{ p.name }}
      </div>

      <div class="col-12 text-xl mb-2">Разрешения администратора</div>
      <div
        v-for="(p, i) in adminPermissions"
        v-bind:key="i"
        class="field col-6 md:col-3"
      >
        <Checkbox
          v-model="p.value"
          :binary="true"
        />
        {{ p.name }}
      </div>
      <div class="col-12 text-xl mb-2">Разрешения справочники</div>
      <div
        v-for="(p, i) in dictionaryPermissions"
        v-bind:key="i"
        class="field col-6 md:col-3"
      >
        <Checkbox
          v-model="p.value"
          :binary="true"
        />
        {{ p.name }}
      </div>
    </div>
    <div class="flex flex-row-reverse my-2 mx-2">
      <Button
        class="ml-2"
        icon="pi pi-check"
        label="Сохранить"
        severity="success"
        size="small"
        @click="handleSave"
      />
      <Button
        icon="pi pi-times"
        label="Закрыть"
        severity="secondary"
        size="small"
        @click="handleClose"
      />
    </div>
  </form>
</template>

<style scoped></style>
