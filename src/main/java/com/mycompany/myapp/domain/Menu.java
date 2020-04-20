package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Menu.
 */
@Entity
@Table(name = "menu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Menu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "i_dmenu", nullable = false)
    private Integer iDmenu;

    @NotNull
    @Column(name = "i_dcooperative", nullable = false)
    private Integer iDcooperative;

    @Column(name = "lastupdate")
    private ZonedDateTime lastupdate;

    @OneToMany(mappedBy = "menu")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Product> products = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "menus", allowSetters = true)
    private Cooperative cooperative;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getiDmenu() {
        return iDmenu;
    }

    public Menu iDmenu(Integer iDmenu) {
        this.iDmenu = iDmenu;
        return this;
    }

    public void setiDmenu(Integer iDmenu) {
        this.iDmenu = iDmenu;
    }

    public Integer getiDcooperative() {
        return iDcooperative;
    }

    public Menu iDcooperative(Integer iDcooperative) {
        this.iDcooperative = iDcooperative;
        return this;
    }

    public void setiDcooperative(Integer iDcooperative) {
        this.iDcooperative = iDcooperative;
    }

    public ZonedDateTime getLastupdate() {
        return lastupdate;
    }

    public Menu lastupdate(ZonedDateTime lastupdate) {
        this.lastupdate = lastupdate;
        return this;
    }

    public void setLastupdate(ZonedDateTime lastupdate) {
        this.lastupdate = lastupdate;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public Menu products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public Menu addProduct(Product product) {
        this.products.add(product);
        product.setMenu(this);
        return this;
    }

    public Menu removeProduct(Product product) {
        this.products.remove(product);
        product.setMenu(null);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Cooperative getCooperative() {
        return cooperative;
    }

    public Menu cooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
        return this;
    }

    public void setCooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Menu)) {
            return false;
        }
        return id != null && id.equals(((Menu) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Menu{" +
            "id=" + getId() +
            ", iDmenu=" + getiDmenu() +
            ", iDcooperative=" + getiDcooperative() +
            ", lastupdate='" + getLastupdate() + "'" +
            "}";
    }
}
