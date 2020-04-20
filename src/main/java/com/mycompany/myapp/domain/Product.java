package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "i_dproduct", nullable = false)
    private Integer iDproduct;

    @NotNull
    @Column(name = "i_dmenu", nullable = false)
    private Integer iDmenu;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Float price;

    @Min(value = 0)
    @Column(name = "disponibility")
    private Integer disponibility;

    @ManyToOne
    @JsonIgnoreProperties(value = "products", allowSetters = true)
    private Menu menu;

    @ManyToMany(mappedBy = "products")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<OrderContent> ordercontents = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getiDproduct() {
        return iDproduct;
    }

    public Product iDproduct(Integer iDproduct) {
        this.iDproduct = iDproduct;
        return this;
    }

    public void setiDproduct(Integer iDproduct) {
        this.iDproduct = iDproduct;
    }

    public Integer getiDmenu() {
        return iDmenu;
    }

    public Product iDmenu(Integer iDmenu) {
        this.iDmenu = iDmenu;
        return this;
    }

    public void setiDmenu(Integer iDmenu) {
        this.iDmenu = iDmenu;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getPrice() {
        return price;
    }

    public Product price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Integer getDisponibility() {
        return disponibility;
    }

    public Product disponibility(Integer disponibility) {
        this.disponibility = disponibility;
        return this;
    }

    public void setDisponibility(Integer disponibility) {
        this.disponibility = disponibility;
    }

    public Menu getMenu() {
        return menu;
    }

    public Product menu(Menu menu) {
        this.menu = menu;
        return this;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public Set<OrderContent> getOrdercontents() {
        return ordercontents;
    }

    public Product ordercontents(Set<OrderContent> orderContents) {
        this.ordercontents = orderContents;
        return this;
    }

    public Product addOrdercontent(OrderContent orderContent) {
        this.ordercontents.add(orderContent);
        orderContent.getProducts().add(this);
        return this;
    }

    public Product removeOrdercontent(OrderContent orderContent) {
        this.ordercontents.remove(orderContent);
        orderContent.getProducts().remove(this);
        return this;
    }

    public void setOrdercontents(Set<OrderContent> orderContents) {
        this.ordercontents = orderContents;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", iDproduct=" + getiDproduct() +
            ", iDmenu=" + getiDmenu() +
            ", name='" + getName() + "'" +
            ", price=" + getPrice() +
            ", disponibility=" + getDisponibility() +
            "}";
    }
}
