package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.CoopcycleApp;
import com.mycompany.myapp.domain.OrderContent;
import com.mycompany.myapp.domain.Product;
import com.mycompany.myapp.repository.OrderContentRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link OrderContentResource} REST controller.
 */
@SpringBootTest(classes = CoopcycleApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class OrderContentResourceIT {

    private static final Integer DEFAULT_I_DPRODUCT = 1;
    private static final Integer UPDATED_I_DPRODUCT = 2;

    private static final Integer DEFAULT_I_DORDER = 1;
    private static final Integer UPDATED_I_DORDER = 2;

    private static final Integer DEFAULT_QUANTITY_ASKED = 1;
    private static final Integer UPDATED_QUANTITY_ASKED = 2;

    private static final Boolean DEFAULT_PRODUCT_AVAILABLE = false;
    private static final Boolean UPDATED_PRODUCT_AVAILABLE = true;

    @Autowired
    private OrderContentRepository orderContentRepository;

    @Mock
    private OrderContentRepository orderContentRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOrderContentMockMvc;

    private OrderContent orderContent;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrderContent createEntity(EntityManager em) {
        OrderContent orderContent = new OrderContent()
            .iDproduct(DEFAULT_I_DPRODUCT)
            .iDorder(DEFAULT_I_DORDER)
            .quantityAsked(DEFAULT_QUANTITY_ASKED)
            .productAvailable(DEFAULT_PRODUCT_AVAILABLE);
        // Add required entity
        Product product;
        if (TestUtil.findAll(em, Product.class).isEmpty()) {
            product = ProductResourceIT.createEntity(em);
            em.persist(product);
            em.flush();
        } else {
            product = TestUtil.findAll(em, Product.class).get(0);
        }
        orderContent.getProducts().add(product);
        return orderContent;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrderContent createUpdatedEntity(EntityManager em) {
        OrderContent orderContent = new OrderContent()
            .iDproduct(UPDATED_I_DPRODUCT)
            .iDorder(UPDATED_I_DORDER)
            .quantityAsked(UPDATED_QUANTITY_ASKED)
            .productAvailable(UPDATED_PRODUCT_AVAILABLE);
        // Add required entity
        Product product;
        if (TestUtil.findAll(em, Product.class).isEmpty()) {
            product = ProductResourceIT.createUpdatedEntity(em);
            em.persist(product);
            em.flush();
        } else {
            product = TestUtil.findAll(em, Product.class).get(0);
        }
        orderContent.getProducts().add(product);
        return orderContent;
    }

    @BeforeEach
    public void initTest() {
        orderContent = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderContent() throws Exception {
        int databaseSizeBeforeCreate = orderContentRepository.findAll().size();
        // Create the OrderContent
        restOrderContentMockMvc.perform(post("/api/order-contents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(orderContent)))
            .andExpect(status().isCreated());

        // Validate the OrderContent in the database
        List<OrderContent> orderContentList = orderContentRepository.findAll();
        assertThat(orderContentList).hasSize(databaseSizeBeforeCreate + 1);
        OrderContent testOrderContent = orderContentList.get(orderContentList.size() - 1);
        assertThat(testOrderContent.getiDproduct()).isEqualTo(DEFAULT_I_DPRODUCT);
        assertThat(testOrderContent.getiDorder()).isEqualTo(DEFAULT_I_DORDER);
        assertThat(testOrderContent.getQuantityAsked()).isEqualTo(DEFAULT_QUANTITY_ASKED);
        assertThat(testOrderContent.isProductAvailable()).isEqualTo(DEFAULT_PRODUCT_AVAILABLE);
    }

    @Test
    @Transactional
    public void createOrderContentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderContentRepository.findAll().size();

        // Create the OrderContent with an existing ID
        orderContent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderContentMockMvc.perform(post("/api/order-contents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(orderContent)))
            .andExpect(status().isBadRequest());

        // Validate the OrderContent in the database
        List<OrderContent> orderContentList = orderContentRepository.findAll();
        assertThat(orderContentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkiDproductIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderContentRepository.findAll().size();
        // set the field null
        orderContent.setiDproduct(null);

        // Create the OrderContent, which fails.


        restOrderContentMockMvc.perform(post("/api/order-contents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(orderContent)))
            .andExpect(status().isBadRequest());

        List<OrderContent> orderContentList = orderContentRepository.findAll();
        assertThat(orderContentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkiDorderIsRequired() throws Exception {
        int databaseSizeBeforeTest = orderContentRepository.findAll().size();
        // set the field null
        orderContent.setiDorder(null);

        // Create the OrderContent, which fails.


        restOrderContentMockMvc.perform(post("/api/order-contents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(orderContent)))
            .andExpect(status().isBadRequest());

        List<OrderContent> orderContentList = orderContentRepository.findAll();
        assertThat(orderContentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrderContents() throws Exception {
        // Initialize the database
        orderContentRepository.saveAndFlush(orderContent);

        // Get all the orderContentList
        restOrderContentMockMvc.perform(get("/api/order-contents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderContent.getId().intValue())))
            .andExpect(jsonPath("$.[*].iDproduct").value(hasItem(DEFAULT_I_DPRODUCT)))
            .andExpect(jsonPath("$.[*].iDorder").value(hasItem(DEFAULT_I_DORDER)))
            .andExpect(jsonPath("$.[*].quantityAsked").value(hasItem(DEFAULT_QUANTITY_ASKED)))
            .andExpect(jsonPath("$.[*].productAvailable").value(hasItem(DEFAULT_PRODUCT_AVAILABLE.booleanValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllOrderContentsWithEagerRelationshipsIsEnabled() throws Exception {
        when(orderContentRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restOrderContentMockMvc.perform(get("/api/order-contents?eagerload=true"))
            .andExpect(status().isOk());

        verify(orderContentRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllOrderContentsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(orderContentRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restOrderContentMockMvc.perform(get("/api/order-contents?eagerload=true"))
            .andExpect(status().isOk());

        verify(orderContentRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getOrderContent() throws Exception {
        // Initialize the database
        orderContentRepository.saveAndFlush(orderContent);

        // Get the orderContent
        restOrderContentMockMvc.perform(get("/api/order-contents/{id}", orderContent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(orderContent.getId().intValue()))
            .andExpect(jsonPath("$.iDproduct").value(DEFAULT_I_DPRODUCT))
            .andExpect(jsonPath("$.iDorder").value(DEFAULT_I_DORDER))
            .andExpect(jsonPath("$.quantityAsked").value(DEFAULT_QUANTITY_ASKED))
            .andExpect(jsonPath("$.productAvailable").value(DEFAULT_PRODUCT_AVAILABLE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingOrderContent() throws Exception {
        // Get the orderContent
        restOrderContentMockMvc.perform(get("/api/order-contents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderContent() throws Exception {
        // Initialize the database
        orderContentRepository.saveAndFlush(orderContent);

        int databaseSizeBeforeUpdate = orderContentRepository.findAll().size();

        // Update the orderContent
        OrderContent updatedOrderContent = orderContentRepository.findById(orderContent.getId()).get();
        // Disconnect from session so that the updates on updatedOrderContent are not directly saved in db
        em.detach(updatedOrderContent);
        updatedOrderContent
            .iDproduct(UPDATED_I_DPRODUCT)
            .iDorder(UPDATED_I_DORDER)
            .quantityAsked(UPDATED_QUANTITY_ASKED)
            .productAvailable(UPDATED_PRODUCT_AVAILABLE);

        restOrderContentMockMvc.perform(put("/api/order-contents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderContent)))
            .andExpect(status().isOk());

        // Validate the OrderContent in the database
        List<OrderContent> orderContentList = orderContentRepository.findAll();
        assertThat(orderContentList).hasSize(databaseSizeBeforeUpdate);
        OrderContent testOrderContent = orderContentList.get(orderContentList.size() - 1);
        assertThat(testOrderContent.getiDproduct()).isEqualTo(UPDATED_I_DPRODUCT);
        assertThat(testOrderContent.getiDorder()).isEqualTo(UPDATED_I_DORDER);
        assertThat(testOrderContent.getQuantityAsked()).isEqualTo(UPDATED_QUANTITY_ASKED);
        assertThat(testOrderContent.isProductAvailable()).isEqualTo(UPDATED_PRODUCT_AVAILABLE);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderContent() throws Exception {
        int databaseSizeBeforeUpdate = orderContentRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrderContentMockMvc.perform(put("/api/order-contents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(orderContent)))
            .andExpect(status().isBadRequest());

        // Validate the OrderContent in the database
        List<OrderContent> orderContentList = orderContentRepository.findAll();
        assertThat(orderContentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrderContent() throws Exception {
        // Initialize the database
        orderContentRepository.saveAndFlush(orderContent);

        int databaseSizeBeforeDelete = orderContentRepository.findAll().size();

        // Delete the orderContent
        restOrderContentMockMvc.perform(delete("/api/order-contents/{id}", orderContent.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OrderContent> orderContentList = orderContentRepository.findAll();
        assertThat(orderContentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
