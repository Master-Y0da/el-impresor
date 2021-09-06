<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ title }}
          </h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" @click="modals.modal3 = true" size="sm">Agregar</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive table-hover">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="products"
      >
        <template v-slot:columns>
          <th>Nombre</th>
          <th>Marca</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Acciones</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{ row.item.nombre }}</span>
              </div>
            </div>
          </th>
          <td class="budget">
            {{ row.item.marca }}
          </td>
          <td>
            <badge pill class="mr-4 w-25 h-25" style="font-size: 15px" :type="BadgeType(row.item.cantidad)">
              {{ row.item.cantidad }}
            </badge>
          </td>
          <td>
            ${{row.item.precio_unitario}}
          </td>

          <td class="text-left">
            <base-dropdown class="dropdown" position="right">
              <template v-slot:title>
                <a
                  class="btn btn-sm btn-icon-only text-light"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-ellipsis-v"></i>
                </a>
              </template>
                <a class="dropdown-item" @click="SellItem(row)">Vender</a>
                <a class="dropdown-item" @click="EditItem(row)">Editar</a>
                <a class="dropdown-item" @click="DeleteItem(row)">Eliminar</a>                
            </base-dropdown>
          </td>
        </template>
      </base-table>
    </div>

    <div class="d-flex justify-content-center my-3" v-if="products.length == 0">
      <i class="fa fa-spinner fa-pulse fa-2x fa-fw text-center" ></i>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >      
      <base-pagination total="30"></base-pagination>
    </div>


    <modal @close="EditStatus" id="myModal" showClose="true" v-model:show="modals.modal3"
           body-classes="p-0"
           modal-classes="modal-dialog-centered modal-sm">
        <card type="secondary" shadow
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0">
            <template v-slot:header>
              <h2>{{edit ? 'Editar': 'Agregar'}} Producto</h2>
            </template>
                <form role="form">
                    <input class="form-control input-group-alternative mb-3"
                                placeholder="Nombre" v-model="form.nombre">
                    <input class="form-control input-group-alternative mb-3"
                                placeholder="Marca" v-model="form.marca">
                    <input class="form-control input-group-alternative mb-3"
                                placeholder="Cantidad" v-model="form.cantidad">
                    <input class="form-control input-group-alternative mb-3"
                                placeholder="Precio Unitario" v-model="form.precio_unitario">
                    <input class="form-control input-group-alternative mb-3"
                                placeholder="Medida" v-model="form.medida">
                    <input class="form-control input-group-alternative mb-3"
                                placeholder="Unidad Medida" v-model="form.unidad_medida">
                    <input type="file" class="form-control" @change="setAvatar"/>
                    <div class="text-center">
                        
                        <button type="button" class="my-4 btn btn-primary" :disabled="loading" @click="submitForm">
                          <i class="fa fa-spinner fa-pulse fa-lg fa-fw " v-if="loading"></i>
                          Agregar
                        </button>
                    </div>
                </form>
        </card>
    </modal>


    <modal v-model:show="modals.modal_vender.show"
           body-classes="p-0"
           modal-classes="modal-dialog-centered modal-sm">
        <card type="secondary" shadow
              header-classes="bg-white pb-5"
              body-classes="px-lg-5 py-lg-5"
              class="border-0">
            <template v-slot:header>
              <h2>{{modals.modal_vender.producto}}</h2>
            </template>
                <form role="form">
                    <h2>Cantidad Disponible: {{modals.modal_vender.cantidad_venta}}</h2>
                    <div class="form-group">
                      <label>Cantidad a vender</label>
                      <input class="form-control input-group-alternative mb-3" type="number" :max="modals.modal_vender.cantidad_venta" placeholder="Cantidad" v-model="modals.modal_vender.cantidad">
                    </div>                    
                    <div class="text-center">                        
                        <button type="button" class="my-4 btn btn-primary" :disabled="loading" @click="submitFormSell">
                          <i class="fa fa-spinner fa-pulse fa-lg fa-fw " v-if="loading"></i>
                          Vender
                        </button>
                    </div>
                </form>
        </card>
    </modal>


    <modal v-model:show="modals.modal_delete.show"
           body-classes="p-0"
           modal-classes="modal-dialog-centered modal-sm">
            <div class="py-3 text-center">
              <i class="ni ni-bell-55 ni-3x text-warning"></i>
              <h4 class="heading mt-4">Importante!!</h4>
              <p>Estas a punto de eliminar un producto del sistema. Esta seguro de continuar ?</p>
            </div>
            <template v-slot:footer>              
              <button type="button" class="mr-auto btn " @click="modals.modal_delete.show = false">Cerrar
              </button>
              <button type="button" class="btn btn-primary" @click="DeleteProduct" :disabled="loading">
                <i class="fa fa-spinner fa-pulse fa-lg fa-fw " v-if="loading"></i>
                Eliminar</button>
          </template>
    </modal>

    <sell-pdf v-if="pdf"/>

  </div>
</template>
<script>
import SellPdf from "@/components/SellPdf"
import { useToast } from "vue-toastification";
const toast = useToast();


export default {
  name: "projects-table",
  components: {SellPdf},
  props: {
    type: {
      type: String,
    },
    title: String
  },
  data() {
    return {
      products: [],
      modals: {
        modal3: false,
        modal_vender: {
          show: false,
          producto: '',
          cantidad_venta: '',
          id: ''
        },
        modal_delete: {
          show: false,
        }
      },
      pdf: false,
      form: {
        nombre: '',
        marca: '',
        cantidad: '',
        precio_unitario: '',
        medida: '',
        unidad_medida: '',
        avatar: ''
      },
      loading: false,
      edit: false,
      aux_key: ''
    }
  },
  mounted(){
    this.axios.get(process.env.VUE_APP_API_URL+'products')
        .then((response)=>{
            this.products = response.data.response.productos
        })
        .catch((error)=>{              
            if(error.response){
              toast.error(error.response.data.response, {
              timeout: 5000
            });
            this.loading = false;
            }
        })    
  },
  methods: {
    BadgeType(status){
      status = parseInt(status)
      if (status >= 200) {
        return 'success'
      }

      if (status >= 100 && status < 200) {
        return 'warning'
      }

      return 'danger'
    },
    EditStatus(){
      this.edit = false
    },
    setAvatar(e){
      this.form.avatar = e.target.files[0].name
    },
    SellItem(item){
      this.modals.modal_vender.show = true
      this.modals.modal_vender.producto = item.item.nombre
      this.modals.modal_vender.id = item.item.key
      this.modals.modal_vender.cantidad = item.item.cantidad
      this.modals.modal_vender.cantidad_venta = item.item.cantidad
    },
    EditItem(item){
      this.edit = true
      this.modals.modal3 = true
      this.form.nombre = item.item.nombre
      this.form.marca = item.item.marca
      this.form.cantidad = item.item.cantidad
      this.form.precio_unitario = item.item.precio_unitario
      this.form.medida = item.item.medida
      this.form.unidad_medida = item.item.unidad_medida
      this.form.avatar = item.item.avatar
      this.aux_key = item.item.key
    },
    DeleteItem(item) {
      this.modals.modal_delete.show = true
      this.aux_key = item.item.key
    },
    submitForm(){

      this.loading = true

      if(this.edit){
          this.axios.patch(process.env.VUE_APP_API_URL+'products/'+this.aux_key, this.form)
            .then((response)=>{
                
                toast.success(response.data.response, {
                  timeout: 2000
                });

                setTimeout(()=> this.$router.go(''), 2000)
            })
            .catch((error)=>{              
                if(error.response){
                  toast.error(error.response.data.response, {
                  timeout: 5000
                });
                this.loading = false;
                }
            })
      }
      else{ 

          this.axios.post(process.env.VUE_APP_API_URL+'products/add/', this.form)
            .then((response)=>{
                
                toast.success(response.data.response, {
                  timeout: 2000
                });

                setTimeout(()=> this.$router.go(''), 2000)
            })
            .catch((error)=>{              
                if(error.response){
                  let mensaje = ''
                  if(error.response.data.detail){
                    mensaje = error.response.data.detail[0].msg.replace('_', ' ')
                  }
                  else{ 
                    mensaje = error.response.data.response
                  }

                  toast.error(mensaje, {
                    timeout: 5000
                  });
                  this.loading = false;
                }
            })
      } 
    },
    submitFormSell(){

      this.loading = true
      // Restamos la cantidad que se quiere vender al total del producto
      this.modals.modal_vender.cantidad = this.modals.modal_vender.cantidad_venta - this.modals.modal_vender.cantidad

      this.axios.patch(process.env.VUE_APP_API_URL+'products/'+this.modals.modal_vender.id, {"cantidad": this.modals.modal_vender.cantidad})
        .then((response)=>{
            
            toast.success(response.data.response, {
              timeout: 2000
            });

            setTimeout(()=> this.$router.go(''), 2000)
        })
        .catch((error)=>{              
            if(error.response){
              toast.error(error.response.data.response, {
              timeout: 5000
            });
            this.loading = false;
            }
        })
    },
    DeleteProduct(){

      this.loading = true

      this.axios.patch(process.env.VUE_APP_API_URL+'products/'+this.aux_key, {"activo": false})
        .then((response)=>{
            
            toast.success(response.data.response, {
              timeout: 2000
            });

            setTimeout(()=> this.$router.go(''), 2000)
        })
        .catch((error)=>{              
            if(error.response){
              toast.error(error.response.data.response, {
              timeout: 5000
            });
            this.loading = false;
            }
        })
    }
  }
};
</script>
<style></style>
