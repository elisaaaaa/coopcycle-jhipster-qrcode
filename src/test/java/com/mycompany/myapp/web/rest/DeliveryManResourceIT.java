package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.CoopcycleApp;
import com.mycompany.myapp.domain.DeliveryMan;
import com.mycompany.myapp.repository.DeliveryManRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DeliveryManResource} REST controller.
 */
@SpringBootTest(classes = CoopcycleApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DeliveryManResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_VEHICULE = "AAAAAAAAAA";
    private static final String UPDATED_VEHICULE = "BBBBBBBBBB";

    private static final Float DEFAULT_LATITUDE = 1F;
    private static final Float UPDATED_LATITUDE = 2F;

    private static final Float DEFAULT_LONGITUDE = 1F;
    private static final Float UPDATED_LONGITUDE = 2F;

    @Autowired
    private DeliveryManRepository deliveryManRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDeliveryManMockMvc;

    private DeliveryMan deliveryMan;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DeliveryMan createEntity(EntityManager em) {
        DeliveryMan deliveryMan = new DeliveryMan()
            .name(DEFAULT_NAME)
            .surname(DEFAULT_SURNAME)
            .telephone(DEFAULT_TELEPHONE)
            .vehicule(DEFAULT_VEHICULE)
            .latitude(DEFAULT_LATITUDE)
            .longitude(DEFAULT_LONGITUDE);
        return deliveryMan;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DeliveryMan createUpdatedEntity(EntityManager em) {
        DeliveryMan deliveryMan = new DeliveryMan()
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .telephone(UPDATED_TELEPHONE)
            .vehicule(UPDATED_VEHICULE)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE);
        return deliveryMan;
    }

    @BeforeEach
    public void initTest() {
        deliveryMan = createEntity(em);
    }

    @Test
    @Transactional
    public void createDeliveryMan() throws Exception {
        int databaseSizeBeforeCreate = deliveryManRepository.findAll().size();
        // Create the DeliveryMan
        restDeliveryManMockMvc.perform(post("/api/delivery-men")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(deliveryMan)))
            .andExpect(status().isCreated());

        // Validate the DeliveryMan in the database
        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeCreate + 1);
        DeliveryMan testDeliveryMan = deliveryManList.get(deliveryManList.size() - 1);
        assertThat(testDeliveryMan.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDeliveryMan.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testDeliveryMan.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testDeliveryMan.getVehicule()).isEqualTo(DEFAULT_VEHICULE);
        assertThat(testDeliveryMan.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testDeliveryMan.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
    }

    @Test
    @Transactional
    public void createDeliveryManWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deliveryManRepository.findAll().size();

        // Create the DeliveryMan with an existing ID
        deliveryMan.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryManMockMvc.perform(post("/api/delivery-men")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(deliveryMan)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryMan in the database
        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLatitudeIsRequired() throws Exception {
        int databaseSizeBeforeTest = deliveryManRepository.findAll().size();
        // set the field null
        deliveryMan.setLatitude(null);

        // Create the DeliveryMan, which fails.


        restDeliveryManMockMvc.perform(post("/api/delivery-men")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(deliveryMan)))
            .andExpect(status().isBadRequest());

        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLongitudeIsRequired() throws Exception {
        int databaseSizeBeforeTest = deliveryManRepository.findAll().size();
        // set the field null
        deliveryMan.setLongitude(null);

        // Create the DeliveryMan, which fails.


        restDeliveryManMockMvc.perform(post("/api/delivery-men")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(deliveryMan)))
            .andExpect(status().isBadRequest());

        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDeliveryMen() throws Exception {
        // Initialize the database
        deliveryManRepository.saveAndFlush(deliveryMan);

        // Get all the deliveryManList
        restDeliveryManMockMvc.perform(get("/api/delivery-men?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliveryMan.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME)))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].vehicule").value(hasItem(DEFAULT_VEHICULE)))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE.doubleValue())))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getDeliveryMan() throws Exception {
        // Initialize the database
        deliveryManRepository.saveAndFlush(deliveryMan);

        // Get the deliveryMan
        restDeliveryManMockMvc.perform(get("/api/delivery-men/{id}", deliveryMan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(deliveryMan.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE))
            .andExpect(jsonPath("$.vehicule").value(DEFAULT_VEHICULE))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE.doubleValue()))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingDeliveryMan() throws Exception {
        // Get the deliveryMan
        restDeliveryManMockMvc.perform(get("/api/delivery-men/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDeliveryMan() throws Exception {
        // Initialize the database
        deliveryManRepository.saveAndFlush(deliveryMan);

        int databaseSizeBeforeUpdate = deliveryManRepository.findAll().size();

        // Update the deliveryMan
        DeliveryMan updatedDeliveryMan = deliveryManRepository.findById(deliveryMan.getId()).get();
        // Disconnect from session so that the updates on updatedDeliveryMan are not directly saved in db
        em.detach(updatedDeliveryMan);
        updatedDeliveryMan
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .telephone(UPDATED_TELEPHONE)
            .vehicule(UPDATED_VEHICULE)
            .latitude(UPDATED_LATITUDE)
            .longitude(UPDATED_LONGITUDE);

        restDeliveryManMockMvc.perform(put("/api/delivery-men")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDeliveryMan)))
            .andExpect(status().isOk());

        // Validate the DeliveryMan in the database
        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeUpdate);
        DeliveryMan testDeliveryMan = deliveryManList.get(deliveryManList.size() - 1);
        assertThat(testDeliveryMan.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDeliveryMan.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testDeliveryMan.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testDeliveryMan.getVehicule()).isEqualTo(UPDATED_VEHICULE);
        assertThat(testDeliveryMan.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testDeliveryMan.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
    }

    @Test
    @Transactional
    public void updateNonExistingDeliveryMan() throws Exception {
        int databaseSizeBeforeUpdate = deliveryManRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeliveryManMockMvc.perform(put("/api/delivery-men")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(deliveryMan)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryMan in the database
        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDeliveryMan() throws Exception {
        // Initialize the database
        deliveryManRepository.saveAndFlush(deliveryMan);

        int databaseSizeBeforeDelete = deliveryManRepository.findAll().size();

        // Delete the deliveryMan
        restDeliveryManMockMvc.perform(delete("/api/delivery-men/{id}", deliveryMan.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
